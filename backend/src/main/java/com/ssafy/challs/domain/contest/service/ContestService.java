package com.ssafy.challs.domain.contest.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;

public interface ContestService {

	ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, MultipartFile contestImage,
		Long memberId);

	void updateContest(ContestUpdateRequestDto contestRequestDto, MultipartFile contestImage, Long memberId);
}
