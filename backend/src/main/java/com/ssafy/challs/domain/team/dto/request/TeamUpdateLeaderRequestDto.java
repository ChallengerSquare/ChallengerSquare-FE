package com.ssafy.challs.domain.team.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamUpdateLeaderRequestDto(
	@Schema(description = "팀장 권한을 양도할 팀의 ID", example = "1")
	Long teamId,
	@Schema(description = "새로 팀장이 될 팀원의 팀 참가 ID", example = "1")
	Long newLeaderParticipantsId
) {
}
