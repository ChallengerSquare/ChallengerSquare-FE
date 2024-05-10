package com.ssafy.challs.domain.qna.service;

import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;

public interface QnaService {

	void createQna(QnaCreateRequestDto qnaCreateRequestDto, Long memberId);
}
