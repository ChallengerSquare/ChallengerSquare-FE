package com.ssafy.challs.domain.member.dto.request;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

public record MemberCreateRequestDto(
	@Schema(description = "회원의 이름", example = "회원이름")
	String memberName,
	@Schema(description = "회원의 생년월일", example = "1999-09-19")
	LocalDate memberBirth,
	@Schema(description = "회원의 전화번호", example = "010-0000-0000")
	String memberPhone,
	@Schema(description = "회원의 주소", example = "서울특별시 강남구 역삼동 멀티캠퍼스")
	String memberAddress
) {
}
