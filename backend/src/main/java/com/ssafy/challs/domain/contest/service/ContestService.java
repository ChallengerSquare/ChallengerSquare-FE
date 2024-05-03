package com.ssafy.challs.domain.contest.service;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;

public interface ContestService {

	ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, Long memberId);

	void updateContest(ContestUpdateRequestDto contestRequestDto, Long memberId);
}
