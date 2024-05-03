package com.ssafy.challs.domain.team.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.mapper.TeamMapper;
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
	private final S3ImageUploader imageConfig;

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
		Team team = teamMapper.teamCreateDtoToTeam(teamRequestDto, teamCode, imageUrl, owner.getMemberPhone());
		// DB에 저장
		Team savedTeam = teamRepository.save(team);

		imageUrl = imageConfig.uploadImage(teamImage, "team", savedTeam.getId().toString());

		teamRepository.updateImage(imageUrl, savedTeam.getId());

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
}
