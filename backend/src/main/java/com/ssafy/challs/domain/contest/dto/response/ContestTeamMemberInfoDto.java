package com.ssafy.challs.domain.contest.dto.response;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestTeamMemberInfoDto(
	@Schema(description = "팀원 이름", example = "강다솔")
	String memberName,
	@Schema(description = "팀원 생년월일", example = "1999-07-23")
	LocalDate memberBirth,
	@Schema(description = "팀원 핸드폰 번호", example = "010-1234-5678")
	String memberPhone,
	@Schema(description = "팀원 주소", example = "서울시 용산구")
	String memberAddress,
	@Schema(description = "팀장 여부", example = "true")
	Boolean isLeader
) {
}
