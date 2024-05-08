package com.ssafy.challs.domain.alert.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public interface SseRepository {
	// SseEmitter를 생성하고 저장
	SseEmitter save(Long emitterId, SseEmitter sseEmitter);

	// 해당 유저의 SseEmitter 조회
	SseEmitter findEmitterByMemberId(Long memberId);

	// SseEmitter 캐시에서 삭제
	void deleteEmitterByMemberId(Long memberId);
}
