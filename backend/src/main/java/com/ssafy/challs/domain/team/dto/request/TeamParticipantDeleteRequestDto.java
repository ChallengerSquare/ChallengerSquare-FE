package com.ssafy.challs.domain.team.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamParticipantDeleteRequestDto(
	@Schema(description = "팀원의 팀 참가 번호", example = "9")
	Long participantsId
) {
}
