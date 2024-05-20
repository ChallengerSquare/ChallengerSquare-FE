package com.ssafy.challs.domain.team.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamParticipantsRequestDto(
	@Schema(description = "팀 참가 수락에 필요한 참가 신청 ID", example = "1")
	Long participantsId,
	@Schema(description = "팀 참가 수락에 필요한 참가 신청 상태", example = "true")
	Boolean participantAgree
) {
}
