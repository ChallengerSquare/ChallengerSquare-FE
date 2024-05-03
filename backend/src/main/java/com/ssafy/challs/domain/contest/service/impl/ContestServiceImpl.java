package com.ssafy.challs.domain.contest.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
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
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.global.common.service.S3ImageUploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

	private final ContestRepository contestRepository;
	private final AwardsRepository awardsRepository;
	private final TeamRepository teamRepository;
	private final ContestMapper contestMapper;
	private final S3ImageUploader imageConfig;

	@Override
	@Transactional
	public ContestCreateResponseDto createContest(ContestCreateRequestDto contestRequestDto, MultipartFile contestImage,
		Long memberId) {
		log.info("입력으로 들어온 정보 >> " + contestRequestDto.toString());
		// TODO : 팀 가져오고 팀장인지 확인
		Team team = new Team();
		teamRepository.save(team);
		// 대회 생성과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// DTO -> ENTITY
		Contest contest = contestMapper.contestCreateDtoToContest(contestRequestDto, team, contestState);
		// DB에 대회, 수상 정보 저장
		Contest savedContest = contestRepository.save(contest);
		// 대회 포스터 S3에 저장 후 URL 가져오기
		String savedImage = imageConfig.uploadImage(contestImage, "contest", savedContest.getId().toString());
		savedContest.setContestImage(savedImage);
		createAwards(savedContest, contestRequestDto.contestAwards());
		return new ContestCreateResponseDto(savedContest.getId());
	}

	@Override
	public void updateContest(ContestUpdateRequestDto contestRequestDto, MultipartFile contestImage, Long memberId) {
		// TODO : 수정시도하는 사람이 팀장인지 확인
		Team team = new Team();

		// 대회 날짜 수정과 동시에 모집 기간인지 확인 (모집전 P 모집중 J)
		Character contestState = isOpenContest(contestRequestDto.registrationPeriod());
		// 대회 수정
		Contest contest = contestMapper.contestUpdateDtoToContest(contestRequestDto, team, contestState);
		// 사진 있다면 S3에 업로드
		if (!contestImage.isEmpty()) {
			imageConfig.uploadImage(contestImage, "contest", contest.getId().toString());
		}

		// 수정된 대회 포스터 S3에 저장 후 URL 가져오기
		String teamImage = "teamImage";
		contestRepository.save(contest);
		// 수상 정보 수정
		updateAwards(contest, contestRequestDto.contestAwards());
	}

	/**
	 * 수상 정보를 수정하는 메서드
	 *
	 * @author 강다솔
	 * @param contest 대회 정보
	 * @param awardsDtoList 수정된 수상 정보
	 */
	private void updateAwards(Contest contest, List<ContestAwardsDto> awardsDtoList) {
		awardsRepository.deleteAllByContest(contest);
		createAwards(contest, awardsDtoList);
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
		log.info("들어온 수상 정보 >> " + awardsDtoList);
		List<Awards> awardsList = awardsDtoList.stream()
			.map(a -> contestMapper.awardsDtoToEntity(a, contest))
			.collect(Collectors.toList());
		log.info("변환된 수상 정보 >> " + awardsList);
		awardsRepository.saveAll(awardsList);
	}
}
