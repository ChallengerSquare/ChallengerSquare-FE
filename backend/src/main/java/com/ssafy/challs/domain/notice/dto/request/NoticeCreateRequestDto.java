package com.ssafy.challs.domain.notice.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record NoticeCreateRequestDto(
	@Schema(description = "공지사항 제목", example = "제목입니다")
	String title,
	@Schema(description = "공지사항 내용", example = "내용입니다")
	String content,
	@Schema(description = "대회 ID", example = "1")
	Long contestId
) {
}
