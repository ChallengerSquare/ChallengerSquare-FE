package com.ssafy.challs.domain.team.dto;

import lombok.Builder;

@Builder
public record TeamMemberInfoDto(
	Long memberId,
	String memberCode,
	String memberName
) {
}
