package com.ssafy.challs.domain.team.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;

public interface TeamService {

	TeamCreateResponseDto createTeam(TeamCreateRequestDto teamRequestDto, Long memberId, MultipartFile teamImage);

	TeamCreateResponseDto updateTeam(TeamUpdateRequestDto teamRequestDto, MultipartFile teamImage,
		Long memberId);
}
