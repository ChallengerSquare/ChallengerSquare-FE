package com.ssafy.challs.domain.contest.dto;

public record ContestParticipantsLeaderStateDto(
	Boolean isLeader,
	Character contestParticipantsState
) {
}
