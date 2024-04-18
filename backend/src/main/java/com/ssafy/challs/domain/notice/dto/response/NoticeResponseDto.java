package com.ssafy.challs.domain.notice.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record NoticeResponseDto(
	@Schema(description = "공지 ID", example = "1")
	Long noticeId,
	@Schema(description = "공지 제목", example = "공지1")
	String title
) {
}
