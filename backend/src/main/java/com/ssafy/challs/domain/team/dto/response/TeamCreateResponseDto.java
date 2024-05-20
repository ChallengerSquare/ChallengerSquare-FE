package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamCreateResponseDto(
	@Schema(description = "생성/수정 된 팀의 id", example = "1")
	Long teamId
) {
}
