package com.ssafy.challs.domain.alert.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseRepository {
	// SseEmitter를 생성하고 저장
	SseEmitter save(String emitterId, SseEmitter sseEmitter);

	// 해당 유저의 SseEmitter 조회
	SseEmitter findEmitterByMemberCode(String memberCode);

	// SseEmitter 캐시에서 삭제
	void deleteEmitterByMemberCode(String memberCode);
}
