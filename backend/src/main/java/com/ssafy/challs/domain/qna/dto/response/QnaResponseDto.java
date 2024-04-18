package com.ssafy.challs.domain.qna.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record QnaResponseDto(
	@Schema(description = "QNA ID", example = "1")
	Long qnaId,
	@Schema(description = "QNA 제목", example = "QNA1")
	String title
) {
}
