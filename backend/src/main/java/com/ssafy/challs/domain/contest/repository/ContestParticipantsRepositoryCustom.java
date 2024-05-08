package com.ssafy.challs.domain.contest.repository;

public interface ContestParticipantsRepositoryCustom {

	boolean checkAlreadyParticipantsMember(Long contestId, Long teamId);
}
