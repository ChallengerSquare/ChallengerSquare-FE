package com.ssafy.challs.domain.team.repository;

public interface TeamParticipantsRepositoryCustom {

	void updateParticipants(Long participantId);

	void updateLeader(Long participantId, boolean isLeader);
}
