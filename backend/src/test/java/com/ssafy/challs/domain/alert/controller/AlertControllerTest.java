package com.ssafy.challs.domain.alert.controller;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;
import com.ssafy.challs.domain.alert.service.AlertService;

@WebMvcTest(AlertController.class)
@MockBean(JpaMetamodelMappingContext.class)  // @EnableJpaAuditing
class AlertControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	private AlertService alertService;

	@Test
	@DisplayName("알림조회_모든알림_성공")
	@WithMockUser(username = "testMember", roles = {"false"})
	void searhAlertListTest() throws Exception {

		// 테스트 데이터 준비
		List<AlertResponseDto> allAlerts = createTestData();
		when(alertService.findAlerts("testMember", false)).thenReturn(allAlerts);

		// 테스트 실행
		mockMvc.perform(MockMvcRequestBuilders.get("/alert")
				.param("memberCode", "testMember"))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.data", hasSize(2)));
	}

	@Test
	@DisplayName("알림조회_안읽은알림_성공")
	@WithMockUser(username = "testMember", roles = {"false"})
	void searhUnreadAlertListTest() throws Exception {

		// 테스트 데이터 준비
		List<AlertResponseDto> unreadAlerts = createTestData();
		when(alertService.findAlerts("testMember", true)).thenReturn(unreadAlerts);

		// 테스트 실행
		mockMvc.perform(MockMvcRequestBuilders.get("/alert")
				.param("memberCode", "testMember")
				.param("unread", "true"))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("$.data", org.hamcrest.Matchers.hasSize(2)));

	}

	private List<AlertResponseDto> createTestData() {
		AlertResponseDto test1 = AlertResponseDto.builder()
			.alertId(1L)
			.alertContent("테스트알림1")
			.alertType('N')
			.alertTargetId(1L)
			.isRead(false).build();
		AlertResponseDto test2 = AlertResponseDto.builder()
			.alertId(2L)
			.alertContent("테스트알림2")
			.alertType('Q')
			.alertTargetId(1L)
			.isRead(false).build();
		return Arrays.asList(test1, test2);
	}

	@Test
	@DisplayName("알림읽음처리_성공")
	@WithMockUser(username = "testMember", roles = {"false"})
	void updateAlertReadStateTest() throws Exception {
		doNothing().when(alertService).updateAlert("testMember", 1L);

		mockMvc.perform(MockMvcRequestBuilders.put("/alert")
				.with(csrf())
				.param("memberCode", "testMember")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"alertId\":\"1\"}"))
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().string(org.hamcrest.Matchers.containsString("success")));
	}

}