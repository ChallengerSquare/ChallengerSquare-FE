package com.ssafy.challs.domain.team.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.entity.TeamParticipants;
import com.ssafy.challs.domain.team.mapper.TeamMapper;
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
		String imageUrl = "";
		// 팀 초대 링크 UUID로 생성
		String teamCode = createTeamCode();
		// 팀 대표 번호 팀장 번호로 저장
		Member owner = memberRepository.findById(memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		// DTO -> ENTITY
		Team team = teamMapper.teamCreateDtoToTeam(teamRequestDto, teamCode, null, owner.getMemberPhone());
		// DB에 저장
		Team savedTeam = teamRepository.save(team);

		// 이미지가 있으면 S3에 업로드 후 팀 로고 정보 수정
		if (teamImage != null) {
			imageUrl = s3ImageUploader.uploadImage(teamImage, "team", savedTeam.getId().toString());
			teamRepository.updateImage(imageUrl, savedTeam.getId());
		}

		TeamParticipants teamParticipants = TeamParticipants
			.builder()
			.member(owner)
			.team(savedTeam)
			.isParticipants(true)
			.isLeader(true)
			.build();
		teamParticipantsRepository.save(teamParticipants);

		return new TeamCreateResponseDto(savedTeam.getId());
	}

	/**
	 * 팀 초대 링크 생성
	 *
	 * @author 강다솔
	 * @return 생성된 초대 링크
	 */
	private String createTeamCode() {
		// TODO : 추후 배포 URL로 변경
		UUID uuid = UUID.randomUUID();
		String teamCode = "http://localhost:8080/api/participants?teamCode=" + uuid;
		// String teamCode = "https://www.challengersquare.com/api/team/participants?teamCode=" + uuid;
		return teamCode;
	}

	/**
	 * 팀 정보 수정
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
		// 멤버 조회
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		// 팀 조회
		Team team = teamRepository.findById(teamRequestDto.teamId())
			.orElseThrow(() -> new BaseException(ErrorCode.TEAM_FOUND_ERROR));
		// 조회된 멤버와 팀으로 현재 요청을 보낸 멤버가 대표인지 확인
		boolean isLeader = teamParticipantsRepository.existsByMemberAndTeamAndIsLeaderTrue(member, team);

		// 대표가 아닌 경우 에러처리
		if (!isLeader) {
			throw new BaseException(ErrorCode.MEMBER_NOT_LEADER);
		}

		// 이미지를 업로드 하는 경우
		if (teamImage != null) {
			s3ImageUploader.uploadImage(teamImage, "team", teamRequestDto.teamId().toString());
		}
		// 팀 정보 수정
		teamRepository.updateTeam(teamRequestDto);

		return new TeamCreateResponseDto(team.getId());
	}

}
