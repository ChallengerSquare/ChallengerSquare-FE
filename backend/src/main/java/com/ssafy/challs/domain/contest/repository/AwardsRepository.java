package com.ssafy.challs.domain.contest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.contest.entity.Awards;

public interface AwardsRepository extends JpaRepository<Awards, Long> {
}
