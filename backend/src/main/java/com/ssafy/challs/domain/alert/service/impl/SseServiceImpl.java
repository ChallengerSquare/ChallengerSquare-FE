package com.ssafy.challs.domain.alert.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.repository.SseRepository;
import com.ssafy.challs.domain.alert.service.SseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

	private final SseRepository sseRepository;
	// SseEmitter의 TIMEOUT 시간
	private static final Long DEFAULT_TIMEOUT = 1800000L;

	/**
	 * 처음 SSE 연결을 맺기위한 SseEmitter 생성 메서드
	 * @author 강다솔
	 * @param memberCode
	 * @return
	 */
	@Override
	public SseEmitter subscribe(String memberCode) {
		// 새로운 SseEmitter 생성하여 캐시에 저장
		SseEmitter emitter = sseRepository.save(memberCode, new SseEmitter(DEFAULT_TIMEOUT));

		// 타임아웃, 에러, complete 시 emitter 삭제
		emitter.onCompletion(() -> sseRepository.deleteEmitterByMemberCode(memberCode));
		emitter.onTimeout(() -> sseRepository.deleteEmitterByMemberCode(memberCode));
		emitter.onError((e) -> sseRepository.deleteEmitterByMemberCode(memberCode));

		// 연결 시 유저가 안읽은 알림 있는지 전송
		send(emitter, memberCode, createConnectionMessage(memberCode));

		return emitter;
	}

	/**
	 * SSE 연결 시 보낼 데이터 생성하는 메서드 : 안읽은 알람 여부
	 *
	 * @author
	 * @param memberCode
	 * @return
	 */
	@Override
	public Map<String, Boolean> createConnectionMessage(String memberCode) {
		Map<String, Boolean> result = new HashMap<>();
		result.put("isConnection", true);
		// TODO : 안읽은 알림 있는지 가져오는 로직 추가
		Boolean unRead = true;
		result.put("unRead", unRead);
		return result;
	}

	/**
	 * 서버에서 변경 있을 시 SSE 알림을 보내는 메서드
	 *
	 * @author
	 * @param receivers
	 * @param message
	 */
	@Override
	public void send(List<String> receivers, Map<String, Boolean> message) {
		for (String receiver : receivers) {
			// 알림을 받을 모든 유저들에게 알림 전송
			SseEmitter emitterByMemberCode = sseRepository.findEmitterByMemberCode(receiver);
			send(emitterByMemberCode, receiver, message);
		}
	}

	/**
	 * 실질적으로 SseEmitter에 알림을 전송하는 메서드
	 *
	 * @author 강다솔
	 * @param sseEmitter
	 * @param memberCode
	 * @param message
	 */
	@Override
	public void send(SseEmitter sseEmitter, String memberCode, Map<String, Boolean> message) {
		try {
			sseEmitter.send(SseEmitter.event()
				.name("sse")
				.data(message, MediaType.APPLICATION_JSON));
		} catch (IOException exception) {
			sseRepository.deleteEmitterByMemberCode(memberCode);
			sseEmitter.completeWithError(exception);
		}
	}

}
