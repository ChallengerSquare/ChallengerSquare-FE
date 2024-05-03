package com.ssafy.challs.domain.contest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;

public interface AwardsRepository extends JpaRepository<Awards, Long> {

	List<Awards> findAllByContest(Contest contest);

	boolean deleteAllByContest(Contest contest);
}
