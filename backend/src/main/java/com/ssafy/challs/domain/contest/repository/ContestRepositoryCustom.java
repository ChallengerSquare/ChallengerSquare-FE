package com.ssafy.challs.domain.contest.repository;

import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.team.dto.response.TeamContestResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContestRepositoryCustom {

    Page<Contest> searchContest(ContestSearchRequestDto searchRequestDto, Pageable pageable);

    Page<TeamContestResponseDto> searchTeamContestList(Long teamId, Pageable pageable);

    Page<Contest> searchContestOrderByRegistrationEnd(Pageable pageable);

    Page<Contest> searchContestOrderByRegistrationNum(Pageable pageable);
}
