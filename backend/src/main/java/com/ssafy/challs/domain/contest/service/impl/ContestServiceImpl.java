package com.ssafy.challs.domain.contest.service.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.alert.service.AlertService;
import com.ssafy.challs.domain.alert.service.SseService;
import com.ssafy.challs.domain.blockchain.dto.request.AwardsChainRequestDto;
import com.ssafy.challs.domain.blockchain.dto.request.ParticipantsChainRequestDto;
import com.ssafy.challs.domain.blockchain.service.BlockChainService;
import com.ssafy.challs.domain.contest.dto.ContestParticipantsInfoDto;
import com.ssafy.challs.domain.contest.dto.ContestParticipantsLeaderStateDto;
import com.ssafy.challs.domain.contest.dto.ContestTeamInfoDto;
import com.ssafy.challs.domain.contest.dto.request.AwardsRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestAwardsRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantAgreeDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
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
import com.ssafy.challs.domain.member.entity.AwardCode;
import com.ssafy.challs.domain.member.repository.AwardsCodeRepository;
import com.ssafy.challs.domain.team.dto.TeamMemberInfoDto;
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

	@Value("${cloud.aws.s3.url}")
	private String awsS3Url;

	private final BlockChainService blockChainService;
	private final AlertService alertService;
	private final SseService sseService;
	private final AwardsCodeRepository awardsCodeRepository;
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
		// 팀 가져오고 팀장인지 확인
		Team team = teamRepository.findById(contestRequestDto.teamId())
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
		isTeamLeader(memberId, team.getId());

		// 대회 생성과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// DTO -> ENTITY
		Contest contest = contestMapper.contestCreateDtoToContest(contestRequestDto, team, contestState);
		// DB에 대회, 수상 정보 저장
		Contest savedContest = contestRepository.save(contest);
		// 대회 포스터 있다면 S3에 저장 후 URL 가져오기
		if (!contestImage.isEmpty()) {
			String savedImage = imageConfig.uploadImage(contestImage, "contest", savedContest.getId().toString());
			savedContest.setContestImage(savedImage);
		}
		createAwards(savedContest, contestRequestDto.contestAwards());
		return new ContestCreateResponseDto(savedContest.getId());
	}

	/**
	 * 대회 수정
	 *
	 * @author 강다솔
	 * @param contestRequestDto 수정된 대회 정보
	 * @param memberId 회원 PK
	 */
	@Override
	@Transactional
	public void updateContest(ContestUpdateRequestDto contestRequestDto, Long memberId) {
		// 수정시도하는 사람이 팀장인지 확인
		Team team = teamRepository.findById(contestRequestDto.teamId())
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
		isTeamLeader(memberId, team.getId());

		// 대회 날짜 수정과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = 'J';
		// 대회 수정
		// 이미지 정보 가져오기
		String contestImage = contestRepository.findContestImageByContestId(contestRequestDto.contestId());
		Contest contest = contestMapper.contestUpdateDtoToContest(contestRequestDto, team, contestState);
		contest.setContestImage(contestImage);
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
		// 조회하는 회원이 신청한 팀장인지, 팀의 참가 신청 상태 가져오기
		ContestParticipantsLeaderStateDto info = contestParticipantsRepository.isLeaderAndParticipantsState(
			contestId, memberId);

		// 대회 정보 가져오기
		boolean isLeader = false;
		String state = "B";
		if (info != null) {
			isLeader = info.isLeader();
			state = info.contestParticipantsState();
		}

		Contest contest = contestRepository.findById(contestId)
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));

		// 개최팀인지 확인
		boolean isMember = teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsParticipantsTrue(memberId,
			contestId);
		if (isMember)
			state = "O";

		// 시상 정보 가져오기
		List<Awards> awardsList = awardsRepository.findAllByContest(contest);
		return contestMapper.contestToFindResponseDto(contest, awsS3Url + contest.getContestImage(), awardsList,
			isLeader, state);
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
		Page<Contest> contests;
		if (orderBy > 2) {
			// 전체 대회 정렬조건으로 조회 (3: 마감 임박, 4: 가나다순)
			contests = contestRepository.searchContest(contestSearchRequestDto, pageable, orderBy);
		} else {
			// 1: 마감 임박, 2: 신청 인원 순
			if (orderBy == 1)
				contests = contestRepository.searchContestOrderByRegistrationEnd(pageable);
			else
				contests = contestRepository.searchContestOrderByRegistrationNum(pageable);
		}

		return contestPageToDtoPage(contests);
	}

	private ContestSearchResponseDto convertToDto(Contest contest) {
		String fullImageUrl = awsS3Url + contest.getContestImage();
		return contestMapper.contestToSearchResponseDto(contest, fullImageUrl);
	}

	public Page<ContestSearchResponseDto> contestPageToDtoPage(Page<Contest> contestPage) {
		return contestPage.map(this::convertToDto);
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
		if (contestRegistrationPeriod.start().isBefore(today)) {
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
		isTeamLeader(memberId, participantRequestDto.teamId());

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
	 * @param contestId 참가취소하는 대회 PK
	 * @param memberId 참가 취소 신청하는 팀장 PK
	 */
	@Override
	@Transactional
	public void deleteContestParticipant(Long contestId, Long memberId) {
		ContestParticipants contestParticipants = contestParticipantsRepository.findContestParticipants(
			contestId, memberId);
		isTeamLeader(memberId, contestParticipants.getTeam().getId());
		contestParticipantsRepository.delete(contestParticipants);
	}

	/**
	 * 대회에 참여하는 팀 정보 조회
	 *
	 * @author 강다솔
	 * @param contestId 대회 PK
	 * @param memberId 조회하는 회원 PK
	 * @return 조회한 팀 정보 리스트
	 */
	@Override
	@Transactional(readOnly = true)
	public ContestParticipantsResponseDto searchContestParticipants(Long contestId,
		Long memberId) {
		// 대회 상태 확인
		Contest contest = contestRepository.findById(contestId)
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));

		// 대회 참여자 목록을 보는 권한 있는지 확인 (개최 팀의 멤버인지 확인)
		isTeamMember(memberId, contest.getTeam().getId());

		// 팀 정보 조회 (팀 ID, 팀 name, 팀원목록)
		List<ContestTeamInfoDto> contestTeamInfoDtos = contestParticipantsRepository.searchTeamInfoByContest(
			contestId, contest.getContestState());

		// 상태별로 반환값 가져오기
		// 수상 정보 가져오기
		List<Awards> awardsList = awardsRepository.findAllByContest(contest);
		if (contest.getContestState().equals('J')) {
			// 모집 중일 때 (팀정보, 승인상태, 신청 사유)
			List<ContestTeamResponseDto> contestTeamList = contestTeamInfoDtos.stream()
				.map(this::createContestTeamResponseDto)
				.toList();
			return contestMapper.dtoToContestTeamResponseDto(contest, contestTeamList,
				contestMapper.awardsToDtoList(awardsList));
		} else {
			// 대회 시작 ~ 끝일 때 (팀정보, 참석여부, 시상정보)
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
		isTeamMember(memberId, teamId);

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
		isTeamMember(memberId, teamId);

		// 대회 상태 변경
		contestRepository.updateContestState(updateStateDto.contestId(), updateStateDto.contestState());

		// 대회 종료 시 모집 결과 알림 전송
		if (updateStateDto.contestState().equals('D')) {
			// 대회 이름, 해당 대회에 참여 신청한 팀 정보 가져오기
			String contestTitle = contestRepository.findContestTitleFromContestId(updateStateDto.contestId());
			List<ContestParticipantsInfoDto> contestParticipantsInfoDto = contestParticipantsRepository.findAllTeamFromContestId(
				updateStateDto.contestId());
			// 팀원 모두에게 알림 전송
			for (ContestParticipantsInfoDto participantsInfoDto : contestParticipantsInfoDto) {
				List<Long> members = contestParticipantsRepository.searchMemberIdFromTeamId(
					participantsInfoDto.teamId());

				// 알림 저장
				if (participantsInfoDto.participantsState().equals('A')) {
					alertService.createAlert(members, 'C', updateStateDto.contestId(),
						"축하합니다! " + contestTitle + " 대회 참가 신청이 확정되었습니다. 자세한 사항은 대회 공지사항을 확인해주세요. ");
				} else {
					alertService.createAlert(members, 'C', updateStateDto.contestId(),
						"제한된 인원으로 인해 " + contestTitle + " 대회 참가 신청이 거절되었습니다. 신청해주셔서 감사합니다. ");
				}

				// 알림 전송
				Map<String, Boolean> message = new HashMap<>();
				message.put("unread", true);
				sseService.send(members, message);
			}
		}
	}

	/**
	 * 대회 수상 / 참가 정보 저장 -> 블록체인 발급
	 *
	 * @author 강다솔
	 * @param contestAwardsRequestDto 대회 참가 / 수상 정보
	 * @param memberId 정보 저장하는 회원 ID
	 */
	@Override
	@Transactional
	public void updateAwardsAndParticipantsState(ContestAwardsRequestDto contestAwardsRequestDto, Long memberId) {
		// 대회 상태 F라면 (이미 정보 기록되어있다면) Exception
		Contest contest = contestRepository.findById(contestAwardsRequestDto.contestId())
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));
		if (contest.getContestState().equals('F'))
			throw new BaseException(ErrorCode.ALREADY_DECIDED);

		// 정보 저장하는 사람이 팀장인지 확인
		Long teamId = contestRepository.findTeamIdByContestId(contestAwardsRequestDto.contestId());
		isTeamLeader(memberId, teamId);

		// 대회 상태 F로 변경
		contestRepository.updateContestState(contestAwardsRequestDto.contestId(), 'F');

		// 대회 참여자 정보 DB 업데이트 (참여 true로 변경)
		List<Long> participantsTeams = contestAwardsRequestDto.contestInfo().stream()
			.map(AwardsRequestDto::teamId).toList();
		contestParticipantsRepository.updateContestIsParticipants(contestAwardsRequestDto.contestId(),
			participantsTeams);

		// 대회 수상 정보 숫자 일치하는지 확인
		List<AwardsRequestDto> awardsInfo = contestAwardsRequestDto.contestInfo().stream()
			.filter(a -> a.awardsId() != null).toList();
		checkAwardsNum(awardsInfo);

		// 대회 참가확인서 / 수상확인서 발급 -> 블록체인
		for (AwardsRequestDto awardsRequestDto : contestAwardsRequestDto.contestInfo()) {
			// 참가자 ID, 참가자 고유코드, 참가자 이름 받아오기
			List<TeamMemberInfoDto> teamMemberInfoDtos = teamParticipantsRepository.searchMemberInfoByTeamId(
				awardsRequestDto.teamId());
			// 참가 확인서 / 수상 확인서 발급 -> 블록체인에 저장
			createCertificate(awardsRequestDto, teamMemberInfoDtos, contest);
		}
	}

	/**
	 * 확인서 생성
	 *
	 * @author 강다솔
	 * @param awardsRequestDto 수상/참가 정보
	 * @param teamMemberInfoDtos 참가자 정보
	 * @param contest 대회 정보
	 */
	private void createCertificate(AwardsRequestDto awardsRequestDto, List<TeamMemberInfoDto> teamMemberInfoDtos,
		Contest contest) {
		for (TeamMemberInfoDto members : teamMemberInfoDtos) {
			// 참가 확인서 발급하기
			// 블록체인 참가증 고유 코드 만들기 (UUID)
			String blockchainCode = UUID.randomUUID().toString();
			AwardCode participantsCertificate = createAwardCode(contest, blockchainCode, members, false);
			awardsCodeRepository.save(participantsCertificate);

			// 참가 확인서 블록체인 저장
			saveBlockchain(contest, blockchainCode, members);

			if (awardsRequestDto.awardsId() != null) {
				String awardsBlockCode = UUID.randomUUID().toString();
				AwardCode awardsCertificate = createAwardCode(contest, awardsBlockCode, members, true);
				awardsCodeRepository.save(awardsCertificate);
				Awards awards = awardsRepository.findById(awardsRequestDto.awardsId())
					.orElseThrow(() -> new BaseException(ErrorCode.AWARDS_CODE_ERROR));

				// 수상 확인서 블록체인 저장
				saveBlockchain(contest, awardsBlockCode, members, awards);
			}
		}
	}

	/**
	 * DB에 참가확인서 / 수상확인서 생성
	 *
	 * @author 강다솔
	 * @param contest 대회정보
	 * @param blockchainCode 수상/참가 코드 정보
	 * @param memberInfo 참가자 정보
	 * @param isAwards 수상 정보인지
	 * @return AwardCode
	 */
	private AwardCode createAwardCode(Contest contest, String blockchainCode, TeamMemberInfoDto memberInfo,
		Boolean isAwards) {
		return AwardCode.builder().isAward(isAwards)
			.contestId(contest.getId())
			.awardCode(blockchainCode)
			.memberId(memberInfo.memberId()).build();
	}

	/**
	 * 블록체인에 참가확인서 저장
	 *
	 * @author 강다솔
	 * @param contest 대회정보
	 * @param blockchainCode 블록체인 코드 정보
	 * @param memberInfo 참가자 정보
	 */
	private void saveBlockchain(Contest contest, String blockchainCode,
		TeamMemberInfoDto memberInfo) {
		ParticipantsChainRequestDto participation = ParticipantsChainRequestDto.builder()
			.type("participation")
			.organizer(contest.getTeam().getTeamName())
			.eventName(contest.getContestTitle())
			.eventDate(contest.getContestStart())
			.attendeeName(memberInfo.memberName())
			.attendeeCode(memberInfo.memberCode())
			.code(blockchainCode).build();

		blockChainService.createBlockChain(participation);
	}

	/**
	 * 블록체인에 수상확인서 저장
	 *
	 * @author 강다솔
	 * @param contest 대회정보
	 * @param blockchainCode 블록체인 코드
	 * @param memberInfo 참가자 정보
	 * @param awards 수상 정보
	 */
	private void saveBlockchain(Contest contest, String blockchainCode,
		TeamMemberInfoDto memberInfo, Awards awards) {
		AwardsChainRequestDto award = AwardsChainRequestDto.builder()
			.type("award")
			.organizer(contest.getTeam().getTeamName())
			.eventName(contest.getContestTitle())
			.awardDate(LocalDate.now())
			.recipientName(memberInfo.memberName())
			.recipientCode(memberInfo.memberCode())
			.code(blockchainCode)
			.awardType(awards.getAwardsName()).build();

		blockChainService.createBlockChain(award);
	}

	/**
	 * 저장된 수상 정보와 일치하는지 확인
	 * @param awardsInfo 수상정보
	 */
	private void checkAwardsNum(List<AwardsRequestDto> awardsInfo) {
		// Awards ID와 개수 집계
		Map<Long, Long> awardsNum = awardsInfo.stream()
			.filter(award -> award.awardsId() != null)
			.collect(Collectors.groupingBy(AwardsRequestDto::awardsId, Collectors.counting()));

		for (Long awardsId : awardsNum.keySet()) {
			Awards awards = awardsRepository.findById(awardsId)
				.orElseThrow(() -> new BaseException(ErrorCode.AWARDS_CODE_ERROR));
			if (awards.getAwardsCount() < awardsNum.get(awardsId)) {
				throw new BaseException(ErrorCode.AWARD_INFO_MISMATCH);
			}
		}
	}

	private void isTeamMember(Long memberId, Long teamId) {
		boolean isTeamMember = teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsParticipantsTrue(memberId,
			teamId);
		if (!isTeamMember) {
			throw new BaseException(ErrorCode.MEMBER_NOT_IN_TEAM);
		}
	}

	private void isTeamLeader(Long memberId, Long teamId) {
		boolean isLeader = teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsLeaderTrue(memberId, teamId);
		if (!isLeader) {
			throw new BaseException(ErrorCode.MEMBER_NOT_LEADER);
		}
	}

}
