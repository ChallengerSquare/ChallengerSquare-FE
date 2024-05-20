package com.ssafy.challs.domain.contest.dto.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record ContestAwardsRequestDto(
	@Schema(description = "수상/참가 정보 기록할 대회 ID", example = "1")
	@NotNull
	Long contestId,
	@Schema(description = "수상/참가 정보")
	@NotNull
	List<AwardsRequestDto> contestInfo
) {
}
