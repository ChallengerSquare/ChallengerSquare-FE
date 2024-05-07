package com.ssafy.challs.domain.contest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContestSearchRequestDto(
	@Schema(description = "검색할 대회이름/주최팀", example = "삼성")
	String keyword,
	@Schema(description = "검색할 대회 카테고리", example = "1")
	Character category,
	@Schema(description = "종료된 대회인지 여부", example = "false")
	Boolean isEnd
) {
}
