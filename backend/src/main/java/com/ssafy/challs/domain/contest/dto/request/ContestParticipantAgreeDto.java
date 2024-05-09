package com.ssafy.challs.domain.contest.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record ContestParticipantAgreeDto(

	@Schema(description = "참가 신청 승인할 대회 ID", example = "1")
	@NotNull
	Long contestId,
	@Schema(description = "참가 수락할 팀 ID 리스트", example = "[1, 2, 3, 4, 5]")
	@NotNull
	List<Long> agreeMembers
) {
}
