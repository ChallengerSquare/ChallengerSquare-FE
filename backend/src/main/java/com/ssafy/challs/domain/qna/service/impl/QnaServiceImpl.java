package com.ssafy.challs.domain.qna.service.impl;

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
import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;
import com.ssafy.challs.domain.qna.entity.Qna;
import com.ssafy.challs.domain.qna.mapper.QnaMapper;
import com.ssafy.challs.domain.qna.repository.QnaRepository;
import com.ssafy.challs.domain.qna.service.QnaService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

	private final ContestRepository contestRepository;
	private final AlertService alertService;
	private final SseService sseService;
	private final ContestParticipantsRepository contestParticipantsRepository;
	private final QnaRepository qnaRepository;
	private final QnaMapper qnaMapper;

	/**
	 * 대회 관련한 질문 등록
	 *
	 * @author 강다솔
	 * @param qnaCreateRequestDto 등록할 질문 정보
	 * @param memberId 질문을 등록하는 member
	 */
	@Override
	@Transactional
	public void createQna(QnaCreateRequestDto qnaCreateRequestDto, Long memberId) {
		Contest contest = contestRepository.findById(qnaCreateRequestDto.contestId())
			.orElseThrow(() -> new BaseException(ErrorCode.CONTEST_NOT_FOUND_ERROR));
		Qna qna = qnaMapper.qnaCreateRequestDtoToQna(qnaCreateRequestDto, contest, memberId);

		// 질문 등록시 대회 개최팀 모두에게 알림 전송
		List<Long> members = contestParticipantsRepository.searchMemberIdFromTeamId(contest.getTeam().getId());
		alertService.createAlert(members, 'Q', qna.getId(), "새로운 질문이 등록되었습니다. 확인해주세요!");
		Map<String, Boolean> message = new HashMap<>();
		message.put("unread", true);
		sseService.send(members, message);
		qnaRepository.save(qna);
	}

	/**
	 * 대회관련 질문 목록 조회
	 *
	 * @author 강다솔
	 * @param contestId 질문 조회할 대회 ID
	 * @param pageable 페이징 정보
	 * @return 조회한 질문 리스트
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<QnaResponseDto> searchQna(Long contestId, Pageable pageable) {
		return qnaRepository.searchQna(contestId, pageable);
	}

	/**
	 * 대회 질문 답변 작성
	 *
	 * @author 강다솔
	 * @param qnaId 답변 등록할 질문 ID
	 * @param answer 답변 정보
	 */
	@Override
	@Transactional
	public void updateQnaAnswer(Long qnaId, String answer) {
		Qna qna = qnaRepository.findById(qnaId).orElseThrow(() -> new BaseException(ErrorCode.QNA_NOT_FOUND));
		qnaRepository.updateQnaAnswer(qnaId, answer);

		// 질문 등록 시 질문 등록자에게 알림 전송
		List<Long> members = List.of(qna.getMemberId());
		alertService.createAlert(members, 'Q', qna.getId(),
			qna.getContest().getContestTitle() + " 대회에 등록한 질문에 답변이 도착했습니다!");
		Map<String, Boolean> message = new HashMap<>();
		message.put("unread", true);
		sseService.send(members, message);
	}
}
