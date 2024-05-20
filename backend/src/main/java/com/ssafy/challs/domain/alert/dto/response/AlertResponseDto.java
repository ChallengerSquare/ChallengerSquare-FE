package com.ssafy.challs.domain.alert.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AlertResponseDto(
	@Schema(description = "알림의 PK", example = "1")
	Long alertId,
	@Schema(description = "알림의 타입", example = "N")
	Character alertType,
	@Schema(description = "알림 메시지 내용", example = "대회에 새로운 공지사항이 올라왔습니다")
	String alertContent,
	@Schema(description = "읽음 여부", example = "false")
	Boolean isRead,
	@Schema(description = "알림 클릭 시 이동할 데이터의 PK", example = "3")
	Long alertTargetId
) {

}
