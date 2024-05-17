package com.ssafy.challs.domain.qna.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record QnaResponseDto(
	@Schema(description = "QNA ID", example = "1")
	Long qnaId,
	@Schema(description = "QNA 제목", example = "QNA 제목1")
	String title,
	@Schema(description = "질문 내용", example = "질문1")
	String content,
	@Schema(description = "답변 내용", example = "답변1")
	String answer,
	@Schema(description = "질문 작성자", example = "작성자")
	String writer
) {
}
