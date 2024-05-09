package com.ssafy.challs.domain.contest.dto.response;

import java.util.List;

public record ContestParticipantsResponseDto(

	Long contestId,
	String contestTitle,
	Character contestState,
	List<ContestTeamResponseDto> teamInfo,
	List<ContestAwardsDto> awards
) {
}
