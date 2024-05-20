package com.ssafy.challs.domain.alert.repository.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.repository.SseRepository;

@Repository
public class SseRepositoryImpl implements SseRepository {
	private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

	/**
	 * 생성한 SseEmitter를 캐시에 {memberCode : SseEmitter}로 저장하는 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원 PK
	 * @param sseEmitter sseEmitte r
	 * @return 저장된 sseEmitter
	 */
	@Override
	public SseEmitter save(Long memberId, SseEmitter sseEmitter) {
		emitters.put(memberId, sseEmitter);
		return emitters.get(memberId);
	}

	/**
	 * 캐시에서 해당 유저의 SseEmitter를 가져오는 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원 PK
	 * @return 회원의 SseEmitter
	 */
	@Override
	public SseEmitter findEmitterByMemberId(Long memberId) {
		return emitters.get(memberId);
	}

	/**
	 * 캐시에서 해당 유저의 SseEmitter를 삭제하는 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원 PK
	 */
	@Override
	public void deleteEmitterByMemberId(Long memberId) {
		emitters.remove(memberId);
	}
}
