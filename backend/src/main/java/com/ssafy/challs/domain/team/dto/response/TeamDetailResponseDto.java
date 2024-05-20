package com.ssafy.challs.domain.team.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamDetailResponseDto(
	@Schema(description = "참가 신청 사유", example = "정말 대회에 참가 하고 싶어요")
	String reason,
	@Schema(description = "팀원 정보")
	List<TeamMemberInfoResponseDto> teamMember
) {
}
