package com.ssafy.challs.domain.team.repository;

import java.util.List;

import com.ssafy.challs.domain.member.dto.response.MemberTeamLeaderResponseDto;
import com.ssafy.challs.domain.team.dto.TeamMemberInfoDto;

public interface TeamParticipantsRepositoryCustom {

	void updateParticipants(Long participantId);

	void updateLeader(Long participantId, boolean isLeader);

	List<MemberTeamLeaderResponseDto> searchTeamLeaderList(Long memberId);

	List<TeamMemberInfoDto> searchMemberInfoByTeamId(Long teamId);
}
