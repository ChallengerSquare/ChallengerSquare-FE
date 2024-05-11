package com.ssafy.challs.domain.contest.controller;

import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.challs.domain.WithCustomMockUser;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.service.ContestService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(ContestController.class)
@MockBean(JpaMetamodelMappingContext.class)
class ContestControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	ContestService contestService;

	private ContestMapper mapper = Mappers.getMapper(ContestMapper.class);
	private ObjectMapper objectMapper;

	@BeforeEach
	void setObjectMapper() {
		objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
	}

	@Test
	@DisplayName("대회 생성_성공")
	@WithCustomMockUser
	void createContest() throws Exception {
		// Given
		ContestCreateRequestDto contestRequestDto = createContestRequestDto();
		String requestBody = objectMapper.writeValueAsString(contestRequestDto);
		MockMultipartFile contestImage = new MockMultipartFile("대회포스터", "대회포스터.jpg", "text/plain",
			"test file".getBytes(StandardCharsets.UTF_8));
		MockPart requestPart = new MockPart("contestCreateRequestDto", "contest",
			requestBody.getBytes(StandardCharsets.UTF_8));
		// 요청 Content-Type 명시
		requestPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);
		ContestCreateResponseDto contestResponseDto = new ContestCreateResponseDto(1L);

		given(contestService.createContest(contestRequestDto, null, 1L))
			.willReturn(contestResponseDto);

		// When
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.multipart("/contest")
			.file(contestImage)
			.part(requestPart)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.contestId").value(1L));
	}

	@Test
	@DisplayName("대회 수정_성공")
	@WithCustomMockUser
	void updateContest() throws Exception {
		// Given
		ContestUpdateRequestDto contestUpdateDto = createContestUpdateDto();
		String requestBody = objectMapper.writeValueAsString(contestUpdateDto);
		MockMultipartFile contestImage = new MockMultipartFile("대회포스터", "대회포스터.jpg", "text/plain",
			"test file".getBytes(StandardCharsets.UTF_8));
		MockPart requestPart = new MockPart("contestCreateRequestDto", "contest",
			requestBody.getBytes(StandardCharsets.UTF_8));
		// 요청 Content-Type 명시
		requestPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

		willDoNothing().given(contestService).updateContest(contestUpdateDto, contestImage, 1L);

		// When
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.multipart("/contest")
			.file(contestImage)
			.part(requestPart)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON))
			;

		// Then
		result.andExpect(status().isOk());
	}

	ContestCreateRequestDto createContestRequestDto() {
		return new ContestCreateRequestDto("대회 제목", "대회 설명", "서울시 역삼",
			1L, new ContestPeriodDto(LocalDate.of(2024, 5, 4), LocalDate.of(2024, 05, 12)),
			new ContestPeriodDto(LocalDate.of(2024, 5, 4), LocalDate.of(2024, 05, 12)),
			100, 10000, "010-1234-5678", false, '3', 1, 5, List.of()
		);
	}

	ContestUpdateRequestDto createContestUpdateDto() {
		return new ContestUpdateRequestDto(1L, "대회 제목", "대회 설명", "서울시 역삼",
			1L, new ContestPeriodDto(LocalDate.of(2024, 5, 4), LocalDate.of(2024, 05, 12)),
			new ContestPeriodDto(LocalDate.of(2024, 5, 4), LocalDate.of(2024, 05, 12)),
			100, 10000, "010-1234-5678", false, '3', 1, 5, List.of()
		);
	}
}