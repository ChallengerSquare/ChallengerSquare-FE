package com.ssafy.challs.domain.team.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamCodeRequestDto(
	@Schema(description = "팀 참가 코드")
	String code
) {
}
