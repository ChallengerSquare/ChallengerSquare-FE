package com.ssafy.challs.domain.contest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.contest.entity.Contest;

public interface ContestRepository extends JpaRepository<Contest, Long>, ContestRepositoryCustom {

}
