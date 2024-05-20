package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record ContestUpdateStateRequestDto(
	@Schema(description = "상태 변경할 대회 ID", example = "1")
	@NotNull
	Long contestId,
	@Schema(description = "변경할 대회 상태", example = "S")
	@NotNull
	Character contestState
) {
}
