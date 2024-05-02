package com.ssafy.challs.domain.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.team.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
