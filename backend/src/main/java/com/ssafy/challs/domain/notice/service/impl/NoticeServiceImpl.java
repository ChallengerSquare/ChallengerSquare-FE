package com.ssafy.challs.domain.notice.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.repository.ContestRepository;
import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.entity.Notice;
import com.ssafy.challs.domain.notice.repository.NoticeRepository;
import com.ssafy.challs.domain.notice.service.NoticeService;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final TeamParticipantsRepository teamParticipantsRepository;
	private final ContestRepository contestRepository;
	private final NoticeRepository noticeRepository;

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
		Notice notice = Notice
			.builder()
			.noticeTitle(noticeCreateRequestDto.title())
			.noticeContent(noticeCreateRequestDto.content())
			.contest(contest)
			.build();
		noticeRepository.save(notice);
	}

}
