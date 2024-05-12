package com.ssafy.challs.domain.team.repository;

import java.util.List;

import com.ssafy.challs.domain.member.dto.response.MemberTeamLeaderResponseDto;

public interface TeamParticipantsRepositoryCustom {

	void updateParticipants(Long participantId);

	void updateLeader(Long participantId, boolean isLeader);

	List<MemberTeamLeaderResponseDto> searchTeamLeaderList(Long memberId);
}
