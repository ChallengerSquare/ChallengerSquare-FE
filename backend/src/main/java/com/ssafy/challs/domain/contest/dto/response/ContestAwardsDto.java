package com.ssafy.challs.domain.contest.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestAwardsDto(
	@Schema(description = "상 이름", example = "최우수상")
	String awardsName,
	@Schema(description = "수상 인원", example = "1")
	Integer awardsCount,
	@Schema(description = "상금", example = "100000")
	Integer awardsPrize
) {
}
