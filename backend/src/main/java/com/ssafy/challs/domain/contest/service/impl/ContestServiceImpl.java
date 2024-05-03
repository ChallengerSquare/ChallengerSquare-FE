package com.ssafy.challs.domain.contest.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.repository.AwardsRepository;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.domain.team.entity.Team;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

	private final ContestRepository contestRepository;
	private final AwardsRepository awardsRepository;
	private final ContestMapper contestMapper;

	@Override
	public ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, Long memberId) {
		// TODO : 팀 가져오고 팀장인지 확인
		Team team = new Team();
		// TODO : 대회 포스터 S3에 저장 후 URL 가져오기
		String contestImage = "contest_temp_image";
		// 대회 생성과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// DTO -> ENTITY
		Contest contest = contestMapper.contestCreateDtoToContest(contestRequestDto, team, contestImage, contestState);
		// DB에 대회, 수상 정보 저장
		Contest savedContest = contestRepository.save(contest);
		createAwards(savedContest, contestRequestDto.contestAwards());
		return new ContestCreateResponseDto(savedContest.getId());
	}

	/**
	 * 대회가 생성됨과 동시에 모집중인지 확인
	 *
	 * @author 강다솔
	 * @param contestRegistrationPeriod 모집 기간
	 * @return 모집전 or 모집중
	 */
	private Character isOpenContest(ContestPeriodDto contestRegistrationPeriod) {
		LocalDate today = LocalDate.now();
		if (!contestRegistrationPeriod.start().isBefore(today)) {
			return 'J';
		}
		return 'P';
	}

	/**
	 * 대회 수상 정보 저장
	 *
	 * @author 강다솔
	 * @param contest DB에 저장된 대회
	 * @param awardsDtoList 수상 정보
	 */
	private void createAwards(Contest contest, List<ContestAwardsDto> awardsDtoList) {
		for (ContestAwardsDto dto : awardsDtoList) {
			Awards awards = contestMapper.awardsDtoToEntity(dto, contest);
			awardsRepository.save(awards);
		}
	}
}
