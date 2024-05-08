package com.ssafy.challs.domain.contest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.contest.entity.ContestParticipants;

public interface ContestParticipantsRepository
	extends JpaRepository<ContestParticipants, Long>, ContestParticipantsRepositoryCustom {
}
