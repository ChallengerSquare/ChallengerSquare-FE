package com.ssafy.challs.domain.contest.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;

public record ContestParticipantAgreeDto(

	@NotNull
	Long contestId,
	@NotNull
	List<Long> agreeMembers
) {
}
