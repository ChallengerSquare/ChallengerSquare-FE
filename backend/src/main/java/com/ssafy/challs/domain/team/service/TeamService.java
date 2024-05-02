package com.ssafy.challs.domain.team.service;

import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;

public interface TeamService {

	TeamCreateResponseDto createTeam(TeamCreateRequestDto teamRequestDto, Long memberId);
}
