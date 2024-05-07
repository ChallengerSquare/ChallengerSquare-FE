package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamInfoResponseDto(
	@Schema(description = "팀 이름", example = "팀 이름 입니다")
	String teamName,
	@Schema(description = "팀 로고", example = "주소입니다")
	String teamImage
) {
}
