package com.ssafy.challs.domain.qna.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record QnaUpdateRequestDto(
	@Schema(description = "답변을 작성 할 QNA ID", example = "1")
	@NotNull
	Long qnaId,
	@Schema(description = "답변 내용", example = "답변 입니다.")
	@NotEmpty
	String answer
) {
}
