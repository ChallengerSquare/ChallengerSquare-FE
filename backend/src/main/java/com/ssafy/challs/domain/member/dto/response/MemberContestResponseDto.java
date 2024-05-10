package com.ssafy.challs.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MemberContestResponseDto(
	@Schema(description = "대회 번호", example = "1")
	Long contestId,
	@Schema(description = "대회 제목", example = "대회입니다")
	String contestTitle,
	@Schema(description = "대회 이미지", example = "URL")
	String contestImage
) {
}
