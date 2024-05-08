package com.ssafy.challs.domain.alert.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.repository.AlertMemberRepository;
import com.ssafy.challs.domain.alert.repository.SseRepository;
import com.ssafy.challs.domain.alert.service.SseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {

	private final SseRepository sseRepository;
	private final AlertMemberRepository alertMemberRepository;
	// SseEmitter의 TIMEOUT 시간
	private static final Long DEFAULT_TIMEOUT = 1800000L;

	/**
	 * 처음 SSE 연결을 맺기위한 SseEmitter 생성 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원 PK
	 * @return 회원의 SseEmitter
	 */
	@Override
	public SseEmitter subscribe(Long memberId) {
		// 새로운 SseEmitter 생성하여 캐시에 저장
		SseEmitter emitter = sseRepository.save(memberId, new SseEmitter(DEFAULT_TIMEOUT));

		// 타임아웃, 에러, complete 시 emitter 삭제
		emitter.onCompletion(() -> sseRepository.deleteEmitterByMemberId(memberId));
		emitter.onTimeout(() -> sseRepository.deleteEmitterByMemberId(memberId));
		emitter.onError((e) -> sseRepository.deleteEmitterByMemberId(memberId));

		// 연결 시 유저가 안읽은 알림 있는지 전송
		send(emitter, memberId, createConnectionMessage(memberId));

		return emitter;
	}

	/**
	 * SSE 연결 시 보낼 데이터 생성하는 메서드 : 안읽은 알람 여부
	 *
	 * @author 강다솔
	 * @param memberId 회원 ID
	 * @return 안읽은 알림 여부
	 */
	@Override
	public Map<String, Boolean> createConnectionMessage(Long memberId) {
		Map<String, Boolean> result = new HashMap<>();
		result.put("isConnection", true);
		// 안읽은 알림 있는지 가져오는 로직 추가
		result.put("unRead", alertMemberRepository.existsByMemberIdAndIsRead(memberId, false));
		return result;
	}

	/**
	 * 서버에서 변경 있을 시 SSE 알림을 보내는 메서드
	 *
	 * @author 강다솔
	 * @param receivers 알림 받는 멤버들
	 * @param message 알림 메시지
	 */
	@Override
	public void send(List<Long> receivers, Map<String, Boolean> message) {
		for (Long receiver : receivers) {
			// 알림을 받을 모든 유저들에게 알림 전송
			SseEmitter emitterByMemberId = sseRepository.findEmitterByMemberId(receiver);
			send(emitterByMemberId, receiver, message);
		}
	}

	/**
	 * 실질적으로 SseEmitter에 알림을 전송하는 메서드
	 *
	 * @author 강다솔
	 * @param sseEmitter 알림 전송할 SseEmitter
	 * @param memberId 회원 PK
	 * @param message 알림 메시지
	 */
	@Override
	public void send(SseEmitter sseEmitter, Long memberId, Map<String, Boolean> message) {
		try {
			sseEmitter.send(SseEmitter.event()
				.name("sse")
				.data(message, MediaType.APPLICATION_JSON));
		} catch (IOException exception) {
			sseRepository.deleteEmitterByMemberId(memberId);
			sseEmitter.completeWithError(exception);
		}
	}

}
