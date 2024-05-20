package com.ssafy.challs.domain.contest.dto.response;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestPeriodDto(
	@Schema(description = "시작 시점", example = "2024-04-16 16:00")
	LocalDate start,
	@Schema(description = "종료 시점", example = "2024-04-16 23:59")
	LocalDate end
) {
}
