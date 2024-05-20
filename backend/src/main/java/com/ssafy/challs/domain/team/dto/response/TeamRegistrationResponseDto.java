package com.ssafy.challs.domain.team.dto.response;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record TeamRegistrationResponseDto(
	@Schema(description = "팀 신청 ID", example = "1")
	Long registrationId,
	@Schema(description = "팀 ID", example = "1")
	Long teamId,
	@Schema(description = "팀 이름", example = "버저비터")
	String teamName,
	@Schema(description = "팀 인원수", example = "3")
	Integer teamNum,
	@Schema(description = "팀장 생년월일", example = "1999-10-01")
	LocalDate leaderBirth,
	@Schema(description = "팀장 전화번호", example = "000-0000-0000")
	String leaderPhone,
	@Schema(description = "1(참가 신청 후 승인 대기중), 2(참가 신청 후 승인 완료), 3(참가 신청 후 승인 거절)", example = "2")
	Integer participantState
) {
}
