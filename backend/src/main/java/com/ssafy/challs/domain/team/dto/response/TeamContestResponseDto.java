package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamContestResponseDto(
	@Schema(description = "대회의 타이틀", example = "대회 이름 입니다")
	String contestTitle,
	@Schema(description = "대회 포스터 이미지", example = "주소입니다")
	String contestImage
) {
}
