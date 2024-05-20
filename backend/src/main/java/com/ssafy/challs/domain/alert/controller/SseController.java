package com.ssafy.challs.domain.alert.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.service.SseService;
import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
@Tag(name = "Sse Controller", description = "Server Sent Event 관리 컨트롤러")
public class SseController {

	private final SseService sseService;

	/**
	 * SSE를 위해 subscribe하는 api
	 *
	 * @author 강다솔
	 * @return SseEmitter
	 */
	@GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	@Operation(summary = "SSE 연결 요청 API", description = "SSE 알림을 받기 위한 객체 생성(구독) 요청")
	public ResponseEntity<SseEmitter> subscribe(@AuthenticationPrincipal SecurityMember securityMember) {
		SseEmitter emitter = sseService.subscribe(securityMember.id());
		return ResponseEntity.ok(emitter);
	}

}
