package com.ssafy.challs.domain.qna.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;

public interface QnaService {

	void createQna(QnaCreateRequestDto qnaCreateRequestDto, Long memberId);

	Page<QnaResponseDto> searchQna(Long contestId, Pageable pageable);

	void updateQnaAnswer(Long qnaId, String answer, Long memberId);
}
