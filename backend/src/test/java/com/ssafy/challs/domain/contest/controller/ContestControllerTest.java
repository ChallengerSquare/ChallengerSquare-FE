package com.ssafy.challs.domain.contest.controller;

import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.challs.domain.WithCustomMockUser;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.service.ContestService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(ContestController.class)
@MockBean(JpaMetamodelMappingContext.class)
class ContestControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	ContestService contestService;

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
		ContestCreateRequestDto contestRequestDto = ContestCreateRequestDto.builder().build();
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(contestRequestDto);
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
		ResultActions result = mockMvc.perform(multipart("/contest")
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
		ContestUpdateRequestDto contestUpdateDto = ContestUpdateRequestDto.builder().build();
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(contestUpdateDto);
		MockMultipartFile contestImage = new MockMultipartFile("대회포스터", "대회포스터.jpg", "text/plain",
			"test file".getBytes(StandardCharsets.UTF_8));
		MockPart requestPart = new MockPart("contestCreateRequestDto", "contest",
			requestBody.getBytes(StandardCharsets.UTF_8));
		// 요청 Content-Type 명시
		requestPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

		willDoNothing().given(contestService).updateContest(contestUpdateDto, contestImage, 1L);

		// When
		ResultActions result = mockMvc.perform(multipart("/contest")
			.file(contestImage)
			.part(requestPart)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk());
	}

	@Test
	@DisplayName("대회검색")
	@WithCustomMockUser
	void searchContestByTitle() throws Exception {
		// Given
		ContestSearchRequestDto searchRequestDto = new ContestSearchRequestDto("개발", '1', false);
		Page<ContestSearchResponseDto> searchResponsePage = createSearchResponsePage();

		given(contestService.searchContest(searchRequestDto, PageRequest.of(1, 10), 1))
			.willReturn(searchResponsePage);

		// When
		ResultActions result = mockMvc.perform(get("/contest")
			.param("keyword", "개발")
			.param("category", "1")
			.param("isEnd", "false")
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		// TODO : 반환값 확인
		result.andExpect(status().isOk())
			.andDo(print());
	}

	Page<ContestSearchResponseDto> createSearchResponsePage() {
		ContestSearchResponseDto response1 = new ContestSearchResponseDto(1L, "개발대회1", "포스터1", "팀1",
			null, null);
		ContestSearchResponseDto response2 = new ContestSearchResponseDto(2L, "개발대회2", "포스터2", "팀2",
			null, null);
		List<ContestSearchResponseDto> responseList = List.of(response1, response2);
		return new PageImpl<>(responseList);
	}

	@Test
	@DisplayName("대회상세조회")
	@WithCustomMockUser
	void findContest() throws Exception {
		// Given
		ContestFindResponseDto contestFindResponseDto = ContestFindResponseDto.builder()
			.contestId(1L)
			.contestTitle("대회 제목")
			.build();

		given(contestService.findContest(1L, 1L)).willReturn(contestFindResponseDto);

		// When
		ResultActions result = mockMvc.perform(get("/contest/" + 1L)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.contestId").value(1L))
			.andExpect(jsonPath("$.data.contestTitle").value("대회 제목"));
	}

}