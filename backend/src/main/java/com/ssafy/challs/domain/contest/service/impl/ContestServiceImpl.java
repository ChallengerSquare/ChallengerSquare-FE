package com.ssafy.challs.domain.contest.service.impl;

import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.*;
import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.mapper.ContestMapper;
import com.ssafy.challs.domain.contest.repository.AwardsRepository;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.repository.TeamRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.service.S3ImageUploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

    private final ContestRepository contestRepository;
    private final AwardsRepository awardsRepository;
    private final TeamRepository teamRepository;
    private final ContestMapper contestMapper;
    private final S3ImageUploader imageConfig;

    /**
     * 대회 등록
     *
     * @param contestRequestDto 등록할 대회 정보
     * @param contestImage      등록할 대회 포스터 이미지
     * @param memberId          등록하는 회원 PK
     * @return 등록된 대회 PK
     * @author 강다솔
     */
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

    /**
     * 대회 수정
     *
     * @param contestRequestDto 수정된 대회 정보
     * @param contestImage      수정된 대회 포스터 이미지
     * @param memberId          회원 PK
     * @author 강다솔
     */
    @Override
    @Transactional
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
     * 대회 상세 조회
     *
     * @param contestId 대회 PK
     * @param memberId  회원 PK
     * @return 대회 상세 정보
     * @author 강다솔
     */
    @Override
    @Transactional(readOnly = true)
    public ContestFindResponseDto findContest(Long contestId, Long memberId) {
        // TODO : 조회하는 회원이 신청한 팀장인지 확인
        Boolean isLeader = false;
        // TODO : 팀의 참가 신청 상태 가져오기
        Character participantState = 'W';
        // 대회 정보 가져오기
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));
        // 시상 정보 가져오기
        List<Awards> awardsList = awardsRepository.findAllByContest(contest);
        return contestMapper.contestToFindResponseDto(contest, awardsList, isLeader, participantState);
    }

    /**
     * 대회 검색
     *
     * @param contestSearchRequestDto 대회 검색 정보
     * @param pageable                페이지 정보
     * @param orderBy                 정렬 정보 (1:마감임박, 2:인기순, 3:최신순, 4:이름순)
     * @return 검색된 대회
     * @author 강다솔
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContestSearchResponseDto> searchContest(ContestSearchRequestDto contestSearchRequestDto,
                                                        Pageable pageable, Integer orderBy) {
        Page<Contest> contests = Page.empty();
        if (orderBy > 2) {
            // 전체 대회 정렬조건으로 조회
            contests = contestRepository.searchContest(contestSearchRequestDto, pageable, orderBy);
        } else {
            if (orderBy == 1) contests = contestRepository.searchContestOrderByRegistrationEnd(pageable);
            else contests = contestRepository.searchContestOrderByRegistrationNum(pageable);
        }

        return contestMapper.contestPageToDtoPage(contests);
    }

    /**
     * 수상 정보를 수정하는 메서드
     *
     * @param contest       대회 정보
     * @param awardsDtoList 수정된 수상 정보
     * @author 강다솔
     */
    private void updateAwards(Contest contest, List<ContestAwardsDto> awardsDtoList) {
        awardsRepository.deleteAllByContest(contest);
        createAwards(contest, awardsDtoList);
    }

    /**
     * 대회가 생성됨과 동시에 모집중인지 확인
     *
     * @param contestRegistrationPeriod 모집 기간
     * @return 모집전 or 모집중
     * @author 강다솔
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
     * @param contest       DB에 저장된 대회
     * @param awardsDtoList 수상 정보
     * @author 강다솔
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
