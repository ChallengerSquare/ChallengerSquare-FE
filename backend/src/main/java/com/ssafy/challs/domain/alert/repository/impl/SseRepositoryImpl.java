package com.ssafy.challs.domain.alert.repository.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.repository.SseRepository;

@Repository
public class SseRepositoryImpl implements SseRepository {
	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

	/**
	 * 생성한 SseEmitter를 캐시에 {memberCode : SseEmitter}로 저장하는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode
	 * @param sseEmitter
	 * @return
	 */
	@Override
	public SseEmitter save(String memberCode, SseEmitter sseEmitter) {
		emitters.put(memberCode, sseEmitter);
		return emitters.get(memberCode);
	}

	/**
	 * 캐시에서 해당 유저의 SseEmitter를 가져오는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode
	 * @return
	 */
	@Override
	public SseEmitter findEmitterByMemberCode(String memberCode) {
		return emitters.get(memberCode);
	}

	/**
	 * 캐시에서 해당 유저의 SseEmitter를 삭제하는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode
	 */
	@Override
	public void deleteEmitterByMemberCode(String memberCode) {
		emitters.remove(memberCode);
	}
}
