package com.ssafy.challs.domain.alert.dto.response;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.swagger.v3.oas.annotations.media.Schema;

public record SseEmitterResponseDto(
	@Schema(description = "SSE 통신을 위한 SseEmitter 객체")
	SseEmitter sseEmitter,
	@Schema(description = "안읽은 메시지가 남아있는지 확인하는 boolean", example = "true")
	Boolean isExistsUnread
) {
}
