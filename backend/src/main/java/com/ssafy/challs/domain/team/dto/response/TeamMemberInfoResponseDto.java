package com.ssafy.challs.domain.team.dto.response;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamMemberInfoResponseDto(
	@Schema(description = "팀원 이름", example = "멤버이름")
	String memberName,
	@Schema(description = "팀원 생년월일", example = "1999.10.10")
	LocalDate memberBirth,
	@Schema(description = "팀원 전화번호", example = "010-0000-0000")
	String memberPhone,
	@Schema(description = "팀원 주소", example = "주소")
	String memberAddress
) {
}
