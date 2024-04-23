package com.ssafy.challs.domain.qna.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record QnaDetailResponseDto(
	@Schema(description = "QNA 제목", example = "QNA 제목1")
	String title,
	@Schema(description = "질문 내용", example = "질문1")
	String content,
	@Schema(description = "답변 내용", example = "답변1")
	String answer
) {
}
