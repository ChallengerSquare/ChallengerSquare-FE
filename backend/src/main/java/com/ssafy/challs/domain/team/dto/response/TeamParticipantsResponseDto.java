package com.ssafy.challs.domain.team.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record TeamParticipantsResponseDto(
	@Schema(description = "팀 참가 신청 ID", example = "1")
	Long participantsId,
	@Schema(description = "팀원 코드", example = "UUID")
	String memberCode,
	@Schema(description = "팀원 이름", example = "이름")
	String memberName,
	@Schema(description = "팀원 이메일", example = "이메일")
	String memberEmail,
	@Schema(description = "팀원 승인여부", example = "false")
	Boolean isApprove
) {
}
