package com.ssafy.challs.domain.contest.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamResponseDto;

public interface ContestService {

	ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, MultipartFile contestImage,
		Long memberId);

	void updateContest(ContestUpdateRequestDto contestRequestDto, MultipartFile contestImage, Long memberId);

	Page<ContestSearchResponseDto> searchContest(ContestSearchRequestDto contestSearchRequestDto, Pageable pageable,
		Integer orderBy);

	ContestFindResponseDto findContest(Long contestId, Long memberId);

	void createContestParticipant(ContestParticipantRequestDto participantRequestDto, Long memberId);

	void deleteContestParticipant(ContestRequestDto contestRequestDto, Long memberId);

	List<ContestTeamResponseDto> searchContestParticipants(ContestRequestDto contestRequestDto, Long memberId);

}
