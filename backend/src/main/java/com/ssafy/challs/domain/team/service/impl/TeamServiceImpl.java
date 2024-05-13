package com.ssafy.challs.domain.team.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.team.dto.request.TeamCodeRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantDeleteRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantsRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateLeaderRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamContestResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamInfoResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamMemberResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.entity.TeamParticipants;
import com.ssafy.challs.domain.team.mapper.TeamMapper;
import com.ssafy.challs.domain.team.mapper.TeamParticipantsMapper;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.domain.team.service.TeamService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.service.S3ImageUploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

	private final TeamRepository teamRepository;
	private final MemberRepository memberRepository;
	private final TeamMapper teamMapper;
	private final S3ImageUploader s3ImageUploader;
	private final TeamParticipantsRepository teamParticipantsRepository;
	private final ContestRepository contestRepository;
	private final TeamParticipantsMapper teamParticipantsMapper;

	@Value("${cloud.aws.s3.url}")
	private String awsS3Url;

	@Value("${redirect-url}")
	private String redirectUrl;

	/**
	 * 팀 생성
	 *
	 * @author 강다솔
	 * @param teamRequestDto 팀 생성 정보 (팀 이름, 로고, 설명)
	 * @param memberId 팀장 PK
	 * @return 생성된 팀의 ID
	 */
	@Override
	@Transactional
	public TeamCreateResponseDto createTeam(TeamCreateRequestDto teamRequestDto, Long memberId,
		MultipartFile teamImage) {
		// 팀 초대 링크 UUID로 생성
		String teamCode = UUID.randomUUID().toString();
		// 팀 대표 번호 팀장 번호로 저장
		Member owner = memberRepository.findById(memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		// DTO -> ENTITY
		Team team = teamMapper.teamCreateDtoToTeam(teamRequestDto, teamCode, null, owner.getMemberPhone());
		// DB에 저장
		Team savedTeam = teamRepository.save(team);

		// 이미지가 있으면 S3에 업로드 후 팀 로고 정보 수정
		if (teamImage != null) {
			String imageUrl = s3ImageUploader.uploadImage(teamImage, "team", savedTeam.getId().toString());
			teamRepository.updateImage(imageUrl, savedTeam.getId());
		}

		TeamParticipants teamParticipants = teamParticipantsMapper.teamCodeRequestDtoToTeamParticipants(savedTeam,
			owner, true, true);
		teamParticipantsRepository.save(teamParticipants);

		return new TeamCreateResponseDto(savedTeam.getId());
	}

	/**
	 * 팀 정보 수정
	 *
	 * @author 강태연
	 * @param teamRequestDto 팀 정보 수정에 필요한 dto
	 * @param teamImage 팀 로고에 사용 될 이미지
	 * @param memberId 현재 요청을 보낸 멤버의 pk
	 * @return 팀의 번호
	 */
	@Override
	@Transactional
	public TeamCreateResponseDto updateTeam(TeamUpdateRequestDto teamRequestDto, MultipartFile teamImage,
		Long memberId) {
		// 조회된 멤버와 팀으로 현재 요청을 보낸 멤버가 대표인지 확인
		checkLeader(memberId, teamRequestDto.teamId());

		// 이미지를 업로드 하는 경우
		if (teamImage != null) {
			String teamImageName = s3ImageUploader.uploadImage(teamImage, "team", teamRequestDto.teamId().toString());
			if (!teamRepository.existsByIdAndTeamImageNotNull(teamRequestDto.teamId())) {
				teamRepository.updateImage(teamImageName, teamRequestDto.teamId());
			}
		}
		// 팀 정보 수정
		teamRepository.updateTeam(teamRequestDto);

		return new TeamCreateResponseDto(teamRequestDto.teamId());
	}

	/**
	 * 팀 가입 신청 할 때 뵤여줄 정보
	 *
	 * @author 강태연
	 * @param teamCode 팀 초대 코드
	 * @param memberId 현재 요청한 멤버 정보
	 * @return 팀 이름, 로고
	 */
	@Override
	@Transactional(readOnly = true)
	public TeamInfoResponseDto findTeamInfo(String teamCode, Long memberId) {
		Team team = getTeam(teamCode, memberId);
		return new TeamInfoResponseDto(team.getTeamName(), awsS3Url + team.getTeamImage());
	}

	/**
	 * 팀 가입 신청
	 *
	 * @author 강태연
	 * @param teamCodeRequestDto 팀 초대 코드
	 * @param memberId 현재 요청한 멤버 정보
	 */
	@Override
	@Transactional
	public void createParticipants(TeamCodeRequestDto teamCodeRequestDto, Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		Team team = getTeam(teamCodeRequestDto.code(), memberId);
		TeamParticipants teamParticipants = teamParticipantsMapper.teamCodeRequestDtoToTeamParticipants(team, member,
			false, false);
		teamParticipantsRepository.save(teamParticipants);
	}

	/**
	 * 팀 가입 신청 수락 or 거절
	 *
	 * @author 강태연
	 * @param teamParticipantsRequestDto 팀 참가 수락 or 거절에 필요한 정보
	 * @param memberId 현재 요청한 멤버 정보
	 */
	@Override
	@Transactional
	public void updateParticipants(TeamParticipantsRequestDto teamParticipantsRequestDto, Long memberId) {
		TeamParticipants teamParticipants = teamParticipantsRepository.findById(
				teamParticipantsRequestDto.participantsId())
			.orElseThrow(() -> new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS));
		checkLeader(memberId, teamParticipants.getTeam().getId());
		boolean isParticipants = teamParticipantsRepository.existsByIdAndIsParticipantsTrue(
			teamParticipantsRequestDto.participantsId());
		if (isParticipants) {
			throw new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS);
		}

		if (Boolean.TRUE.equals(teamParticipantsRequestDto.participantAgree())) {
			teamParticipantsRepository.updateParticipants(teamParticipantsRequestDto.participantsId());
		} else {
			teamParticipantsRepository.deleteById(teamParticipantsRequestDto.participantsId());
		}
	}

	/**
	 * 팀의 리더가 아니면 에러 발생
	 *
	 * @author 강태연
	 * @param memberId 현재 요청한 멤버 정보
	 * @param teamId 팀 번호
	 */
	private void checkLeader(Long memberId, Long teamId) {
		boolean isLeader = teamParticipantsRepository.existsByMemberIdAndTeamIdAndIsLeaderTrue(memberId,
			teamId);
		if (!isLeader) {
			throw new BaseException(ErrorCode.MEMBER_NOT_LEADER);
		}
	}

	/**
	 * 팀 초대코드로 팀 조회(없으면 에러) & 이미 해당 팀에 신청을 한 상태라면 에러
	 *
	 * @author 강태연
	 * @param teamCode 팀 초대 코드
	 * @param memberId 현재 요청한 멤버 정보
	 * @return 팀
	 */
	private Team getTeam(String teamCode, Long memberId) {
		Team team = teamRepository.findByTeamCode(teamCode)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
		boolean isExists = teamParticipantsRepository.existsByMemberIdAndTeamId(memberId, team.getId());
		if (isExists) {
			throw new BaseException(ErrorCode.MEMBER_EXISTS_PARTICIPANTS);
		}
		return team;
	}

	/**
	 * 팀장인 경우 팀원 조회
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @param memberId 현재 요청한 멤버 정보
	 * @return 팀원의 정보 팀장 먼저, 가입된 사람들 먼저, 가입 신청한 사람들, 정렬 기준은 PK
	 */
	@Override
	@Transactional(readOnly = true)
	public List<TeamParticipantsResponseDto> searchTeamParticipantList(Long teamId, Long memberId) {
		checkLeader(memberId, teamId);
		Sort sort = Sort.by(Sort.Direction.DESC, "isLeader")
			.and(Sort.by(Sort.Direction.DESC, "isParticipants")
				.and(Sort.by(Sort.Direction.ASC, "id")));
		return teamParticipantsRepository.findByTeamId(teamId, sort)
			.stream()
			.map(teamParticipants -> teamMapper.teamParticipantsToTeamParticipantsResponseDto(teamParticipants.getId(),
				teamParticipants.getMember(), teamParticipants.getIsParticipants()))
			.toList();
	}

	/**
	 * 팀원을 조회할 경우
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 팀원의 정보 팀장 먼저, 가입된 사람들, 정렬 기준은 PK
	 */
	@Override
	@Transactional(readOnly = true)
	public List<TeamMemberResponseDto> searchTeamMemberList(Long teamId) {
		Sort sort = Sort.by(Sort.Direction.DESC, "isLeader")
			.and(Sort.by(Sort.Direction.ASC, "id"));
		List<TeamParticipants> teamMemberList = teamParticipantsRepository.findByTeamIdAndIsParticipantsTrue(
			teamId, sort);
		return teamMemberList.stream()
			.map(teamParticipants -> new TeamMemberResponseDto(teamParticipants.getMember().getMemberName()))
			.toList();
	}

	/**
	 * 팀 정보 조회
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @param memberId 현재 요청한 멤버 정보
	 * @return 팀의 정보, 팀의 리더인지 여부
	 */
	@Override
	@Transactional(readOnly = true)
	public TeamResponseDto findTeam(Long teamId, Long memberId) {
		TeamParticipants teamParticipants = teamParticipantsRepository.findByTeamIdAndMemberId(teamId, memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
		if (!Objects.equals(teamParticipants.getTeam().getId(), teamId)) {
			throw new BaseException(ErrorCode.TEAM_FOUND_ERROR);
		}
		Team team = teamParticipants.getTeam();
		return teamMapper.teamToTeamResponseDto(team, teamParticipants.getIsLeader(), redirectUrl + team.getTeamCode(),
			awsS3Url + team.getTeamImage());
	}

	/**
	 * 팀 정보 조회(모두에게 오픈)
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 팀의 정보, 팀의 리더인지 여부
	 */
	@Override
	@Transactional(readOnly = true)
	public TeamPublicResponseDto findTeamPublic(Long teamId) {
		return teamRepository.findTeamPublic(teamId).orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
	}

	/**
	 * 팀 삭제
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @param memberId 현재 요청한 멤버 정보
	 */
	@Override
	@Transactional
	public void deleteTeam(Long teamId, Long memberId) {
		checkLeader(memberId, teamId);
		String teamImage = teamRepository.findById(teamId)
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR))
			.getTeamImage();
		teamParticipantsRepository.deleteByTeamId(teamId);
		teamRepository.deleteById(teamId);
		s3ImageUploader.deleteImage(teamImage);
	}

	/**
	 * 팀 탈퇴
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @param memberId 현재 요청한 멤버 정보
	 */
	@Override
	@Transactional
	public void deleteParticipants(Long teamId, Long memberId) {
		TeamParticipants teamParticipants = teamParticipantsRepository.findByTeamIdAndMemberId(teamId, memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS));
		if (Boolean.TRUE.equals(teamParticipants.getIsLeader())) {
			throw new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS);
		}
		teamParticipantsRepository.deleteById(teamParticipants.getId());
	}

	/**
	 * 팀 리더 변경
	 *
	 * @author 강태연
	 * @param teamUpdateLeaderRequestDto 팀 리더 변경에 필요한 정보
	 * @param memberId 현재 요청한 멤버 정보
	 */
	@Override
	@Transactional
	public void updateTeamLeader(TeamUpdateLeaderRequestDto teamUpdateLeaderRequestDto, Long memberId) {
		checkLeader(memberId, teamUpdateLeaderRequestDto.teamId());
		TeamParticipants teamParticipants = teamParticipantsRepository.findByIdAndIsParticipantsTrue(
				teamUpdateLeaderRequestDto.newLeaderParticipantsId())
			.orElseThrow(() -> new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS));
		if (!Objects.equals(teamParticipants.getTeam().getId(), teamUpdateLeaderRequestDto.teamId())) {
			throw new BaseException(ErrorCode.BAD_REQUEST_ERROR);
		}
		Long id = teamParticipantsRepository.findByTeamIdAndMemberId(teamUpdateLeaderRequestDto.teamId(), memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS)).getId();
		teamParticipantsRepository.updateLeader(id, false);
		teamParticipantsRepository.updateLeader(teamUpdateLeaderRequestDto.newLeaderParticipantsId(), true);
	}

	/**
	 * 팀이 개최한 대회 목록 조회
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @param pageable 페이지 정보
	 * @return 팀이 개최한 대회의 제목, 이미지
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<TeamContestResponseDto> searchTeamContestList(Long teamId, Pageable pageable) {
		return contestRepository.searchTeamContestList(teamId, pageable);
	}

	/**
	 * 팀장이 팀원을 방출
	 *
	 * @author 강태연
	 * @param teamParticipantDeleteRequestDto 팀원의 팀 참가 번호
	 * @param memberId 현재 접속한 멤버의 정보
	 */
	@Override
	@Transactional
	public void deleteTeamParticipant(TeamParticipantDeleteRequestDto teamParticipantDeleteRequestDto, Long memberId) {
		Long teamId = teamParticipantsRepository.findById(teamParticipantDeleteRequestDto.participantsId())
			.orElseThrow(() -> new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS))
			.getTeam()
			.getId();
		checkLeader(memberId, teamId);
		teamParticipantsRepository.deleteById(teamParticipantDeleteRequestDto.participantsId());
	}

}
