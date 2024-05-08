package com.ssafy.challs.domain.contest.repository;

import com.ssafy.challs.domain.contest.entity.ContestParticipants;

public interface ContestParticipantsRepositoryCustom {

	boolean checkAlreadyParticipantsMember(Long contestId, Long teamId);

	ContestParticipants findContestParticipants(Long contestId, Long memberId);
}
