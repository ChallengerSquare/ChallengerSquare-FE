package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamMemberResponseDto(
	@Schema(description = "멤버 이름",example = "홍길동")
	String memberName
) {
}
