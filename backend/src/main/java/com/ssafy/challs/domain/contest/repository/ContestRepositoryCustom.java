package com.ssafy.challs.domain.contest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.entity.Contest;

public interface ContestRepositoryCustom {

	Page<Contest> searchContest(ContestSearchRequestDto searchRequestDto, Pageable pageable);
}
