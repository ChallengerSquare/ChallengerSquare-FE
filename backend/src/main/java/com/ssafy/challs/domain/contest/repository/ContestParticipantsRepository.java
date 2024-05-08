package com.ssafy.challs.domain.contest.repository;

import com.ssafy.challs.domain.contest.entity.ContestParticipants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestParticipantsRepository extends JpaRepository<ContestParticipants, Long> {
}
