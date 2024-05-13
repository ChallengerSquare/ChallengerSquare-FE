package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record TeamPublicResponseDto(
	@Schema(description = "팀 ID", example = "1")
	Long teamId,
	@Schema(description = "팀 이름", example = "팀 이름")
	String teamName,
	@Schema(description = "팀 설명", example = "팀 설명")
	String teamDescription,
	@Schema(description = "팀 로고 주소", example = "팀 로고")
	String teamImage
) {
}
