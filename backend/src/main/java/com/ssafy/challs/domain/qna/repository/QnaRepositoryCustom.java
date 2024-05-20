package com.ssafy.challs.domain.qna.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;

public interface QnaRepositoryCustom {

	Page<QnaResponseDto> searchQna(Long contestId, Pageable pageable);

	void updateQnaAnswer(Long qnaId, String answer);
}
