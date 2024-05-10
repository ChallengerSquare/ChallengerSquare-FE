package com.ssafy.challs.domain.member.dto.response;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record MemberAwardsCodeResponseDto(
	@Schema(description = "대회 카테고리", example = "2")
	Integer contestCategory,
	@Schema(description = "대회 제목", example = "대회입니다")
	String contestTitle,
	@Schema(description = "대회 시작일", example = "2024-05-08")
	LocalDate contestStartDate,
	@Schema(description = "대회 종료일", example = "2024-05-20")
	LocalDate contestEndDate,
	@Schema(description = "수상 코드", example = "UUID")
	String awardCode,
	@Schema(description = "참가 확인 코드", example = "UUID")
	String participantCode
) {
}
