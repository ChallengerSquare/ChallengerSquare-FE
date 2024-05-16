package com.ssafy.challs.domain.notice.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.alert.service.AlertService;
import com.ssafy.challs.domain.alert.service.SseService;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.repository.ContestParticipantsRepository;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;
import com.ssafy.challs.domain.notice.entity.Notice;
import com.ssafy.challs.domain.notice.mapper.NoticeMapper;
import com.ssafy.challs.domain.notice.repository.NoticeRepository;
import com.ssafy.challs.domain.notice.service.NoticeService;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final TeamParticipantsRepository teamParticipantsRepository;
	private final ContestRepository contestRepository;
	private final NoticeRepository noticeRepository;
	private final NoticeMapper noticeMapper;
	private final ContestParticipantsRepository contestParticipantsRepository;
	private final AlertService alertService;
	private final SseService sseService;

	/**
	 * 공지사항 작성
	 *
	 * @author 강태연
	 * @param noticeCreateRequestDto 공지사항 작성에 필요한 정보
	 * @param memberId 현재 요청을 보낸 멤버 정보
	 */
	@Override
	@Transactional
	public void createNotice(NoticeCreateRequestDto noticeCreateRequestDto, Long memberId) {
		Long contestId = noticeCreateRequestDto.contestId();
		Contest contest = contestRepository.findById(contestId)
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));
		Long teamId = contest.getTeam().getId();
		boolean exists = teamParticipantsRepository.existsByMemberIdAndTeamId(memberId, teamId);
		if (!exists) {
			throw new BaseException(ErrorCode.PARTICIPANTS_NOT_EXISTS);
		}

		Notice notice = noticeMapper.noticeCreateRequestDtoToNotice(noticeCreateRequestDto, contest);

		List<Long> memberIdList = contestParticipantsRepository.searchMemberIdListFromContestId(contest.getId());
		noticeRepository.save(notice);

		// 알림 생성, sse 전송
		alertService.createAlert(memberIdList, 'N', notice.getId(),
			contest.getContestTitle() + " 대회에 새로운 공지사항이 작성되었습니다.");
		Map<String, Boolean> message = new HashMap<>();
		message.put("unread", true);
		try {
			sseService.send(memberIdList, message);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
	}

	/**
	 * 공지사항 목록 조회
	 *
	 * @author 강태연
	 * @param contestId 대회 번호
	 * @param pageable 페이징 정보
	 * @return 공지사항 목록
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<NoticeResponseDto> searchNoticeList(Long contestId, Pageable pageable) {
		return noticeRepository.searchNoticeList(pageable, contestId);
	}

}
