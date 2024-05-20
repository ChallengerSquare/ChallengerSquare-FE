package com.ssafy.challs.domain.team.dto.request;

import org.hibernate.validator.constraints.Length;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "팀 생성을 위한 정보를 받는 DTO")
public record TeamCreateRequestDto(
	@Length(min = 2, max = 20)
	@Schema(description = "팀 이름 최소 2글자 ~ 최대 20글자", example = "팀이름!!!!!")
	String teamName,
	@Schema(description = "팀 설명 무제한", example = "팀설명!!!!!")
	String teamDescription
) {
}
