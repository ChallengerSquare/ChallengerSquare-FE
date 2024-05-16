package com.ssafy.challs.domain.contest.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ContestAwardsDto(
	@Schema(description = "상 ID", example = "1")
	@NotNull
	Long awardsId,
	@Schema(description = "상 이름", example = "최우수상")
	@NotEmpty
	String awardsName,
	@Schema(description = "수상 인원", example = "1")
	@NotNull
	Integer awardsCount,
	@Schema(description = "상금", example = "100000")
	@NotNull
	Integer awardsPrize
) {
}
