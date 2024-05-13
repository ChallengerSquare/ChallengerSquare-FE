package com.ssafy.challs.domain.team.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.member.dto.response.MemberTeamResponseDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;

public interface TeamRepositoryCustom {

	void updateImage(String imageUrl, Long teamId);

	void updateTeam(TeamUpdateRequestDto teamUpdateRequestDto);

	Page<MemberTeamResponseDto> searchTeamList(Long memberId, Pageable pageable);

	Optional<TeamPublicResponseDto> findTeamPublic(Long teamId);
}
