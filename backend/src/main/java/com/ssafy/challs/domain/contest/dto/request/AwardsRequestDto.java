package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record AwardsRequestDto(
	@Schema(description = "수상/참가하는 팀 ID", example = "1")
	@NotNull
	Long teamId,
	@Schema(description = "수상하는 상 ID", example = "1")
	Long awardsId
) {
}
