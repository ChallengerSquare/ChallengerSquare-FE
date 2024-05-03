package com.ssafy.challs.domain.team.repository;

import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;

public interface TeamRepositoryCustom{

	void updateImage(String imageUrl, Long teamId);

	void updateTeam(TeamUpdateRequestDto teamUpdateRequestDto);

}
