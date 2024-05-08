package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestRequestDto(
	@Schema(description = "대회 상태 변경 or 참가 취소 or 참여 팀 조회에 사용 할 대회 ID", example = "1")
	Long contestId
) {
}
