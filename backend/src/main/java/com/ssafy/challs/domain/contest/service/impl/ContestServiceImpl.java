package com.ssafy.challs.domain.contest.service.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.alert.service.SseService;
import com.ssafy.challs.domain.contest.dto.ContestParticipantsInfoDto;
import com.ssafy.challs.domain.contest.dto.ContestTeamInfoDto;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantAgreeDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateStateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestParticipantsResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamMemberInfoDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamResponseDto;
import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.entity.ContestParticipants;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.repository.AwardsRepository;
import com.ssafy.challs.domain.contest.repository.ContestParticipantsRepository;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.service.S3ImageUploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

	private final SseService sseService;
	private final ContestRepository contestRepository;
	private final ContestParticipantsRepository contestParticipantsRepository;
	private final AwardsRepository awardsRepository;
	private final TeamRepository teamRepository;
	private final TeamParticipantsRepository teamParticipantsRepository;
	private final ContestMapper contestMapper;
	private final S3ImageUploader imageConfig;

	/**
	 * 대회 등록
	 *
	 * @author 강다솔
	 * @param contestRequestDto 등록할 대회 정보
	 * @param contestImage      등록할 대회 포스터 이미지
	 * @param memberId          등록하는 회원 PK
	 * @return 등록된 대회 PK
	 */
	@Override
	@Transactional
	public ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, MultipartFile contestImage,
		Long memberId) {
		// TODO : 팀 가져오고 팀장인지 확인
		Team team = new Team();
		teamRepository.save(team);
		// 대회 생성과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// DTO -> ENTITY
		Contest contest = contestMapper.contestCreateDtoToContest(contestRequestDto, team, contestState);
		// DB에 대회, 수상 정보 저장
		Contest savedContest = contestRepository.save(contest);
		// 대회 포스터 S3에 저장 후 URL 가져오기
		String savedImage = imageConfig.uploadImage(contestImage, "contest", savedContest.getId().toString());
		savedContest.setContestImage(savedImage);
		createAwards(savedContest, contestRequestDto.contestAwards());
		return new ContestCreateResponseDto(savedContest.getId());
	}

	/**
	 * 대회 수정
	 *
	 * @author 강다솔
	 * @param contestRequestDto 수정된 대회 정보
	 * @param contestImage 수정된 대회 포스터 이미지
	 * @param memberId 회원 PK
	 */
	@Override
	@Transactional
	public void updateContest(ContestUpdateRequestDto contestRequestDto, MultipartFile contestImage, Long memberId) {
		// TODO : 수정시도하는 사람이 팀장인지 확인
		Team team = new Team();

		// 대회 날짜 수정과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// 대회 수정
		Contest contest = contestMapper.contestUpdateDtoToContest(contestRequestDto, team, contestState);
		// 사진 있다면 S3에 업로드
		if (!contestImage.isEmpty()) {
			imageConfig.uploadImage(contestImage, "contest", contest.getId().toString());
		}

		// 수정된 대회 포스터 S3에 저장 후 URL 가져오기
		String teamImage = "teamImage";
		contestRepository.save(contest);
		// 수상 정보 수정
		updateAwards(contest, contestRequestDto.contestAwards());
	}

	/**
	 * 대회 상세 조회
	 *
	 * @author 강다솔
	 * @param contestId 대회 PK
	 * @param memberId  회원 PK
	 * @return 대회 상세 정보
	 */
	@Override
	@Transactional(readOnly = true)
	public ContestFindResponseDto findContest(Long contestId, Long memberId) {
		// TODO : 조회하는 회원이 신청한 팀장인지 확인
		Boolean isLeader = false;
		// TODO : 팀의 참가 신청 상태 가져오기
		Character participantState = 'W';
		// 대회 정보 가져오기
		Contest contest = contestRepository.findById(contestId)
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));
		// 시상 정보 가져오기
		List<Awards> awardsList = awardsRepository.findAllByContest(contest);
		return contestMapper.contestToFindResponseDto(contest, awardsList, isLeader, participantState);
	}

	/**
	 * 대회 검색
	 *
	 * @author 강다솔
	 * @param contestSearchRequestDto 대회 검색 정보
	 * @param pageable 페이지 정보
	 * @param orderBy 정렬 정보 (1:마감임박, 2:인기순, 3:최신순, 4:이름순)
	 * @return 검색된 대회
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<ContestSearchResponseDto> searchContest(ContestSearchRequestDto contestSearchRequestDto,
		Pageable pageable, Integer orderBy) {
		Page<Contest> contests = Page.empty();
		if (orderBy > 2) {
			// 전체 대회 정렬조건으로 조회
			contests = contestRepository.searchContest(contestSearchRequestDto, pageable, orderBy);
		} else {
			if (orderBy == 1)
				contests = contestRepository.searchContestOrderByRegistrationEnd(pageable);
			else
				contests = contestRepository.searchContestOrderByRegistrationNum(pageable);
		}

		return contestMapper.contestPageToDtoPage(contests);
	}

	/**
	 * 수상 정보를 수정하는 메서드
	 *
	 * @author 강다솔
	 * @param contest 대회 정보
	 * @param awardsDtoList 수정된 수상 정보
	 */
	private void updateAwards(Contest contest, List<ContestAwardsDto> awardsDtoList) {
		awardsRepository.deleteAllByContest(contest);
		createAwards(contest, awardsDtoList);
	}

	/**
	 * 대회가 생성됨과 동시에 모집중인지 확인
	 *
	 * @author 강다솔
	 * @param contestRegistrationPeriod 모집 기간
	 * @return 모집전 or 모집중
	 */
	private Character isOpenContest(ContestPeriodDto contestRegistrationPeriod) {
		LocalDate today = LocalDate.now();
		if (!contestRegistrationPeriod.start().isBefore(today)) {
			return 'J';
		}
		return 'P';
	}

	/**
	 * 대회 수상 정보 저장
	 *
	 * @author 강다솔
	 * @param contest 수상정보 저장할 대회
	 * @param awardsDtoList 수상 정보
	 */
	private void createAwards(Contest contest, List<ContestAwardsDto> awardsDtoList) {
		List<Awards> awardsList = awardsDtoList.stream()
			.map(a -> contestMapper.awardsDtoToEntity(a, contest))
			.collect(Collectors.toList());
		awardsRepository.saveAll(awardsList);
	}

	/**
	 * 대회 참가 신청
	 *
	 * @author 강다솔
	 * @param participantRequestDto 대회 참가 신청 정보
	 * @param memberId 신청자
	 */
	@Override
	@Transactional
	public void createContestParticipant(ContestParticipantRequestDto participantRequestDto, Long memberId) {
		// 신청자가 팀장인지 확인
		boolean isLeader = teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsLeaderTrue(memberId,
			participantRequestDto.teamId());
		if (!isLeader)
			throw new BaseException(ErrorCode.MEMBER_IS_LEADER);

		// 팀에 이미 참가 신청된 회원이 있는지 확인
		if (contestParticipantsRepository.checkAlreadyParticipantsMember(participantRequestDto.contestId(),
			participantRequestDto.teamId())) {
			throw new BaseException(ErrorCode.CONTEST_ALREADY_PARTICIPANTS_ERROR);
		}

		// 참가신청 정보 Entity로 변환
		Contest contest = contestRepository.findById(participantRequestDto.contestId())
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));

		// 모집중인 대회인지 확인
		if (!contest.getContestState().equals('J')) {
			throw new BaseException(ErrorCode.CONTEST_NOT_OPEN_ERROR);
		}

		Team team = teamRepository.findById(participantRequestDto.teamId())
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));

		ContestParticipants contestParticipants = contestMapper.contestParticipantsDtoToEntity(participantRequestDto,
			contest, team);

		// 참가 신청 정보 저장
		contestParticipantsRepository.save(contestParticipants);
	}

	/**
	 * 대회 참가 신청 취소
	 *
	 * @author 강다솔
	 * @param contestRequestDto 참가취소하는 대회 PK
	 * @param memberId 참가 취소 신청하는 팀장 PK
	 */
	@Override
	@Transactional
	public void deleteContestParticipant(ContestRequestDto contestRequestDto, Long memberId) {
		ContestParticipants contestParticipants = contestParticipantsRepository.findContestParticipants(
			contestRequestDto.contestId(), memberId);
		contestParticipantsRepository.delete(contestParticipants);
	}

	/**
	 * 대회에 참여하는 팀 정보 조회
	 *
	 * @author 강다솔
	 * @param contestRequestDto 대회 PK
	 * @param memberId 조회하는 회원 PK
	 * @return 조회한 팀 정보 리스트
	 */
	@Override
	@Transactional(readOnly = true)
	public ContestParticipantsResponseDto searchContestParticipants(ContestRequestDto contestRequestDto,
		Long memberId) {
		// 대회 상태 확인
		Contest contest = contestRepository.findById(contestRequestDto.contestId())
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));

		// 대회 참여자 목록을 보는 권한 있는지 확인 (개최 팀의 멤버인지 확인)
		boolean isMember = teamParticipantsRepository.existsByMemberIdAndTeamId(memberId, contest.getTeam().getId());
		if (!isMember) {
			throw new BaseException(ErrorCode.MEMBER_NOT_IN_TEAM);
		}

		// 팀 정보 조회 (팀 ID, 팀 name, 팀원목록)
		List<ContestTeamInfoDto> contestTeamInfoDtos = contestParticipantsRepository.searchTeamInfoByContest(
			contestRequestDto.contestId(), contest.getContestState());

		// 상태별로 반환값 가져오기
		if (contest.getContestState().equals('J')) {
			// 모집 중일 때 (팀정보, 승인상태, 신청 사유)
			List<ContestTeamResponseDto> contestTeamList = contestTeamInfoDtos.stream()
				.map(this::createContestTeamResponseDto)
				.toList();
			return contestMapper.dtoToContestTeamResponseDto(contest, contestTeamList, null);
		} else {
			// 대회 시작 ~ 끝일 때 (팀정보, 참석여부, 시상정보)
			// 수상 정보 가져오기
			List<Awards> awardsList = awardsRepository.findAllByContest(contest);
			List<ContestTeamResponseDto> contestTeamList = contestTeamInfoDtos.stream()
				.map(this::createContestTeamResponseDto)
				.collect(Collectors.toList());
			return contestMapper.dtoToContestTeamResponseDto(contest, contestTeamList,
				contestMapper.awardsToDtoList(awardsList));
		}

	}

	/**
	 * 조회한 정보들로 반환 DTO 만드는 메서드
	 *
	 * @author 강다솔
	 * @param teamInfo 팀정보
	 * @return CustomTeamResponseDto(팀정보, 팀원정보, 수상정보)
	 */
	private ContestTeamResponseDto createContestTeamResponseDto(ContestTeamInfoDto teamInfo) {
		List<ContestTeamMemberInfoDto> teamMemberInfo =
			contestParticipantsRepository.searchTeamMemberByTeamId(teamInfo.teamId());

		return contestMapper.entityToContestTeamResponseDto(teamInfo, teamMemberInfo);
	}

	/**
	 * 대회 참가신청한 팀의 수락 여부를 변경
	 *
	 * @author 강다솔
	 * @param contestParticipantAgreeDto 대회 PK, 수락된 팀 정보
	 * @param memberId 로그인한 회원 정보
	 */
	@Override
	@Transactional
	public void updateContestParticipantsState(ContestParticipantAgreeDto contestParticipantAgreeDto, Long memberId) {
		// 승인/거절하는 사람이 개최 팀의 팀원인지 확인
		Long teamId = contestRepository.findTeamIdByContestId(contestParticipantAgreeDto.contestId());
		boolean isTeamMember = teamParticipantsRepository.existsByMemberIdAndTeamId(memberId, teamId);
		if (!isTeamMember) {
			throw new BaseException(ErrorCode.MEMBER_NOT_IN_TEAM);
		}

		// 상태 업데이트
		contestParticipantsRepository.updateContestParticipantsState(contestParticipantAgreeDto.contestId(),
			contestParticipantAgreeDto.agreeMembers());
	}

	/**
	 * 대회 상태 변경
	 *
	 * @author 강다솔
	 * @param updateStateDto 변경할 대회 정보
	 * @param memberId 로그인한 회원 정보
	 */
	@Override
	@Transactional
	public void updateContestState(ContestUpdateStateRequestDto updateStateDto, Long memberId) {
		// 대회 상태 변경하는 사람이 개최 팀의 팀원인지 확인
		Long teamId = contestRepository.findTeamIdByContestId(updateStateDto.contestId());
		boolean isTeamMember = teamParticipantsRepository.existsByMemberIdAndTeamId(memberId, teamId);
		if (!isTeamMember) {
			throw new BaseException(ErrorCode.MEMBER_NOT_IN_TEAM);
		}

		// 대회 상태 변경
		contestRepository.updateContestState(updateStateDto.contestId(), updateStateDto.contestState());

		// 대회 종료 시 모집 결과 알림 전송
		if (updateStateDto.contestState().equals('D')) {
			// 해당 대회에 참여 신청한 팀 정보 가져오기
			List<ContestParticipantsInfoDto> contestParticipantsInfoDto = contestParticipantsRepository.findAllTeamFromContestId(
				updateStateDto.contestId());
			// 팀원 모두에게 알림 전송
			for (ContestParticipantsInfoDto participantsInfoDto : contestParticipantsInfoDto) {
				List<Long> members = contestParticipantsRepository.searchMemberIdFromTeamId(
					participantsInfoDto.teamId());
				Map<String, Boolean> message = new HashMap<>();
				message.put("unread", true);
				sseService.send(members, message);
			}
		}
	}

}
