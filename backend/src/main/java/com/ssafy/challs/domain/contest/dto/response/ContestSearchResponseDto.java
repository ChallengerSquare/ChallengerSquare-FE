package com.ssafy.challs.domain.contest.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestSearchResponseDto(
	@Schema(description = "대회 ID", example = "1")
	Long contestId,
	@Schema(description = "대회 제목", example = "데이터 수집 대회!!!!!!!!")
	String contestTitle,
	@Schema(description = "대회 포스터", example = "대충 s3 주소")
	String contestImage,
	@Schema(description = "대회 개최팀 이름", example = "SSAFY")
	String teamName,
	@Schema(description = "대회 접수 신청 기간")
	ContestPeriodDto registrationPeriod,
	@Schema(description = "대회 진행 기간")
	ContestPeriodDto contestPeriod
) {
}
