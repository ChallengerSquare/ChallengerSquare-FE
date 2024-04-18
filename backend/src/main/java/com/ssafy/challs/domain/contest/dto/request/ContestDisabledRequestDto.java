package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestDisabledRequestDto(
	@Schema(description = "모집을 더 받고싶지 않은 경우 or 대회를 취소하는 경우 or 대회 참가를 취소하는 경우에 사용 할 대회 ID", example = "1")
	Long contestId
) {
}
