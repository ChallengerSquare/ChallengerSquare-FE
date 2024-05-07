package com.ssafy.challs.domain.team.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.team.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long>, TeamRepositoryCustom {

	Optional<Team> findByTeamCode(String teamCode);

}
