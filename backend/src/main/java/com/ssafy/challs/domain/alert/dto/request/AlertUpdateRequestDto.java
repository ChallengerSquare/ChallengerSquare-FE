package com.ssafy.challs.domain.alert.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record AlertUpdateRequestDto(
	@Schema(description = "읽음 처리할 알림 PK", example = "1L")
	Long alertId
) {

}
