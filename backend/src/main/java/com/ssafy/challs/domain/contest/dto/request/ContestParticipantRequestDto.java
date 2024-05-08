package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestParticipantRequestDto(
        @Schema(description = "참가할 대회 ID", example = "1")
        Long contestId,
        @Schema(description = "참가 신청할 팀 ID", example = "1")
        Long teamId,
        @Schema(description = "참가 신청 사유", example = "정말 대회에 참가 하고 싶어요")
        String contestParticipantsReason
) {
}
