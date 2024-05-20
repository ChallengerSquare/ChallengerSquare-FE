package com.ssafy.challs.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MemberTeamResponseDto(
	@Schema(description = "팀 번호", example = "1")
	Long teamId,
	@Schema(description = "팀 이름", example = "팀이름입니다")
	String teamName,
	@Schema(description = "팀 로고", example = "URL")
	String teamImage,
	@Schema(description = "팀 인원수", example = "10")
	Integer teamMemberCount,
	@Schema(description = "팀 개최한 대회 수", example = "1")
	Integer teamContestCount,
	@Schema(description = "팀 참가 완료한 대회 수", example = "2")
	Integer teamParticipantsCount,
	@Schema(description = "팀 설명", example = "팀 설명 입니다")
	String teamDescription,
	@Schema(description = "팀 초대코드", example = "UUID")
	String teamCode
) {
}
