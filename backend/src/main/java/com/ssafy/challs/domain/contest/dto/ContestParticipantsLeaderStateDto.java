package com.ssafy.challs.domain.contest.dto;

public record ContestParticipantsLeaderStateDto(
	Boolean isLeader,
	String contestParticipantsState
) {
}
