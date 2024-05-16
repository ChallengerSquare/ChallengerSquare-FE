package com.ssafy.challs.domain.contest.controller;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.challs.domain.WithCustomMockUser;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantAgreeDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateStateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestParticipantsResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamResponseDto;
import com.ssafy.challs.domain.contest.service.ContestService;

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
		ContestCreateRequestDto contestRequestDto = createContestCreateRequestDto();
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

	ContestCreateRequestDto createContestCreateRequestDto() {
		return ContestCreateRequestDto.builder()
			.contestTitle("대회 제목")
			.contestContent("대회 설명")
			.contestLocation("서울시 역상동")
			.teamId(1L)
			.registrationPeriod(new ContestPeriodDto(LocalDate.of(2024, 05, 10), LocalDate.of(2024, 05, 22)))
			.contestPeriod(new ContestPeriodDto(LocalDate.of(2024, 05, 25), LocalDate.of(2024, 05, 30)))
			.contestRegistrationNum(10)
			.contestFee(10000)
			.contestPhone("010-1234-5678")
			.isPriority(false)
			.contestCategory('1')
			.contestAwards(List.of())
			.build();
	}

	@Test
	@DisplayName("대회 수정_성공")
	@WithCustomMockUser
	void updateContest() throws Exception {
		// Given
		ContestUpdateRequestDto contestUpdateDto = createContestUpdateRequestDto();
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(contestUpdateDto);
		MockMultipartFile contestImage = new MockMultipartFile("대회포스터", "대회포스터.jpg", "text/plain",
			"test file".getBytes(StandardCharsets.UTF_8));
		MockPart requestPart = new MockPart("contestCreateRequestDto", "contest",
			requestBody.getBytes(StandardCharsets.UTF_8));
		// 요청 Content-Type 명시
		requestPart.getHeaders().setContentType(MediaType.APPLICATION_JSON);

		willDoNothing().given(contestService).updateContest(contestUpdateDto, 1L);

		// When
		ResultActions result = mockMvc.perform(multipart("/contest")
			.file(contestImage)
			.part(requestPart)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk());
	}

	ContestUpdateRequestDto createContestUpdateRequestDto() {
		return ContestUpdateRequestDto.builder()
			.contestId(1L)
			.contestTitle("대회 제목")
			.contestContent("대회 설명")
			.contestLocation("서울시 역상동")
			.teamId(1L)
			.registrationPeriod(new ContestPeriodDto(LocalDate.of(2024, 05, 10), LocalDate.of(2024, 05, 22)))
			.contestPeriod(new ContestPeriodDto(LocalDate.of(2024, 05, 25), LocalDate.of(2024, 05, 30)))
			.contestRegistrationNum(10)
			.contestFee(10000)
			.contestPhone("010-1234-5678")
			.isPriority(false)
			.contestCategory('1')
			.contestAwards(List.of())
			.build();
	}

	@Test
	@DisplayName("대회검색")
	@WithCustomMockUser
	void searchContestByTitle() throws Exception {
		// Given
		ContestSearchRequestDto searchRequestDto = new ContestSearchRequestDto("개발", '1', false);
		Page<ContestSearchResponseDto> searchResponsePage = createSearchResponsePage();

		if (searchResponsePage.isEmpty())
			System.out.println("비어있는 값");
		given(contestService.searchContest(searchRequestDto, PageRequest.of(0, 10), 3))
			.willReturn(searchResponsePage);

		// When
		ResultActions result = mockMvc.perform(get("/contest")
			.param("keyword", "개발")
			.param("category", "1")
			.param("isEnd", "false")
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.size").value(2))
			.andExpect(jsonPath("$.data.content[0].contestId").value(1))
			.andExpect(jsonPath("$.data.content[1].contestId").value(2));
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

	@Test
	@DisplayName("대회 참가 신청")
	@WithCustomMockUser
	void createContestParticipant() throws Exception {
		// Given
		ContestParticipantRequestDto participantsRequestDto = new ContestParticipantRequestDto(1L, 1L, "참가하고 싶어요");
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(participantsRequestDto);

		willDoNothing().given(contestService).createContestParticipant(participantsRequestDto, 1L);

		// When
		ResultActions result = mockMvc.perform(post("/contest/participants")
			.with(csrf())
			.content(requestBody)
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data").value("success"));
	}

	@Test
	@DisplayName("대회 참가 취소")
	@WithCustomMockUser
	void deleteContestParticipant() throws Exception {
		// Given
		willDoNothing().given(contestService).deleteContestParticipant(1L, 1L);

		// When
		ResultActions result = mockMvc.perform(delete("/contest/participants/" + 1)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data").value("success"));
	}

	@Test
	@DisplayName("대회 참가 신청 팀 조회")
	@WithCustomMockUser
	void searchContestParticipants() throws Exception {
		// Given
		List<ContestTeamResponseDto> teamList = createTeamResponseList();
		ContestParticipantsResponseDto participantsResponseDto = ContestParticipantsResponseDto.builder()
			.contestId(1L)
			.teamInfo(teamList)
			.build();

		System.out.println(participantsResponseDto.teamInfo());
		given(contestService.searchContestParticipants(1L, 1L)).willReturn(participantsResponseDto);

		// When
		ResultActions result = mockMvc.perform(get("/contest/participants/" + 1)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.contestId").value(1L))
			.andExpect(jsonPath("$.data.teamInfo", hasSize(2)));
	}

	List<ContestTeamResponseDto> createTeamResponseList() {
		ContestTeamResponseDto team1 = ContestTeamResponseDto.builder().teamId(1L).teamName("팀이름1").build();
		ContestTeamResponseDto team2 = ContestTeamResponseDto.builder().teamId(2L).teamName("팀이름2").build();
		return List.of(team1, team2);
	}

	@Test
	@DisplayName("대회 참가 승인/거절")
	@WithCustomMockUser
	void updateContestParticipantsState() throws Exception {
		// Given
		ContestParticipantAgreeDto contestParticipantAgreeDto = new ContestParticipantAgreeDto(1L,
			List.of(1L, 23L, 239L, 12L, 30L));
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter()
			.writeValueAsString(contestParticipantAgreeDto);

		willDoNothing().given(contestService).updateContestParticipantsState(contestParticipantAgreeDto, 1L);

		// When
		ResultActions result = mockMvc.perform(put("/contest/participants")
			.with(csrf())
			.content(requestBody)
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data").value("success"));
	}

	@Test
	@DisplayName("대회 상태 변경")
	@WithCustomMockUser
	void updateContestRegistration() throws Exception {
		// Given
		ContestUpdateStateRequestDto updateStateDto = new ContestUpdateStateRequestDto(1L, 'W');
		String requestBody = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(updateStateDto);

		willDoNothing().given(contestService).updateContestState(updateStateDto, 1L);

		// When
		ResultActions result = mockMvc.perform(put("/contest/state")
			.with(csrf())
			.content(requestBody)
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data").value("success"));
	}
}