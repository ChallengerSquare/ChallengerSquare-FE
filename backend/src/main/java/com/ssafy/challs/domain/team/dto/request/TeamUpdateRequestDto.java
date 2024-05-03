package com.ssafy.challs.domain.team.dto.request;

import org.hibernate.validator.constraints.Length;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "팀 수정을 위한 정보를 받는 DTO")
public record TeamUpdateRequestDto(
	@Schema(description = "팀 ID", example = "1")
	Long teamId,
	@Length(min = 2, max = 20)
	@Schema(description = "팀 이름 최소 2글자 ~ 최대 20글자", example = "팀이름!!!!!")
	String teamName,
	@Schema(description = "팀 설명 무제한", example = "팀설명!!!!!")
	String teamDescription,
	@Schema(description = "팀 전화번호", example = "010-0000-0000")
	String teamPhone
) {
}
