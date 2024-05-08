package com.ssafy.challs.domain.alert.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

	public SseEmitter subscribe(Long memberId);

	public Map<String, Boolean> createConnectionMessage(Long memberId);

	public void send(List<Long> receivers, Map<String, Boolean> message);

	void send(SseEmitter sseEmitter, Long memberId, Map<String, Boolean> message);

}
