package com.ssafy.challs.domain.qna.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record QnaCreateRequestDto(

	@Schema(description = "QNA 제목", example = "제목입니다")
	@NotEmpty
	String qnaTitle,
	@Schema(description = "QNA 내용", example = "내용입니다")
	@NotEmpty
	String qnaContent,
	@Schema(description = "대회 ID", example = "1")
	@NotNull
	Long contestId
) {
}
