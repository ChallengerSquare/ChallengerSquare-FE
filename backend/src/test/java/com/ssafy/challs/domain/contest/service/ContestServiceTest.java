package com.ssafy.challs.domain.contest.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.alert.service.AlertService;
import com.ssafy.challs.domain.alert.service.SseService;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.repository.AwardsRepository;
import com.ssafy.challs.domain.contest.repository.ContestParticipantsRepository;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.contest.service.impl.ContestServiceImpl;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.service.S3ImageUploader;

@ExtendWith(MockitoExtension.class)
class ContestServiceTest {

	@Mock
	private AlertService alertService;
	@Mock
	private SseService sseService;
	@Mock
	private ContestRepository contestRepository;
	@Mock
	private ContestParticipantsRepository contestParticipantsRepository;
	@Mock
	private AwardsRepository awardsRepository;
	@Mock
	private TeamRepository teamRepository;
	@Mock
	private TeamParticipantsRepository teamParticipantsRepository;
	@Mock
	private ContestMapper contestMapper;
	@Mock
	private S3ImageUploader imageUploader;

	@InjectMocks
	private ContestServiceImpl contestService;

	private ContestCreateRequestDto contestCreateRequestDto;
	private Team team;
	private Contest contest;
	private MultipartFile contestImage;

	@BeforeEach
	void setup() {
		// Given
		team = Team.builder().id(1L).teamName("팀 이름").build();
		contest = Contest.builder().id(1L).team(team).contestTitle("대회 제목").build();
		contestCreateRequestDto = ContestCreateRequestDto.builder()
			.registrationPeriod(new ContestPeriodDto(LocalDate.of(2024, 05, 10),
				LocalDate.of(2024, 05, 22)))
			.contestTitle("대회 제목")
			.teamId(1L)
			.contestAwards(List.of())
			.build();
		contestImage = new MockMultipartFile("image", "test.jpg", "image/jpeg",
			"test image content".getBytes());
	}

	@Test
	@DisplayName("대회 등록_성공")
	void createContest_success() {
		// Given
		given(contestMapper.contestCreateDtoToContest(contestCreateRequestDto, team, 'J')).willReturn(contest);
		given(contestRepository.save(contest)).willReturn(contest);
		given(imageUploader.uploadImage(contestImage, "contest", "1")).willReturn("image_url");
		given(teamRepository.findById(1L)).willReturn(Optional.of(team));
		given(teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsLeaderTrue(1L, 1L))
			.willReturn(true);

		// When
		ContestCreateResponseDto result = contestService.createContest(contestCreateRequestDto,
			contestImage, 1L);

		// Then
		assertNotNull(result);
		assertEquals(1L, result.contestId());
		then(teamRepository).should().findById(1L);
		then(contestMapper).should().contestCreateDtoToContest(contestCreateRequestDto, team, 'J');
		then(contestRepository).should().save(contest);
		then(imageUploader).should().uploadImage(contestImage, "contest", "1");
	}

	@Test
	@DisplayName("대회 등록_팀 조회 실패")
	void createContest_not_found_team() {
		// Given
		given(teamRepository.findById(1L)).willReturn(Optional.empty());

		// When & Then
		BaseException exception = assertThrows(BaseException.class, () ->
			contestService.createContest(contestCreateRequestDto, contestImage, 1L));
		assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.TEAM_FOUND_ERROR);
	}

	@Test
	@DisplayName("대회 등록_권한 없음 (팀장 아님)")
	void createContest_is_not_owner() {
		// Given
		given(teamRepository.findById(1L)).willReturn(Optional.of(team));
		given(teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsLeaderTrue(1L, 1L))
			.willReturn(false);

		// When & Then
		BaseException exception = assertThrows(BaseException.class, () ->
			contestService.createContest(contestCreateRequestDto, contestImage, 1L));
		assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.MEMBER_NOT_LEADER);
	}

}