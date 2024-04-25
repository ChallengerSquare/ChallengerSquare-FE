package com.ssafy.challs.domain.alert.service;

import java.util.List;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;

public interface SseService {

	public SseEmitter subscribe(String memberCode, String lastEventId);

	AlertResponseDto createDummyAlert(String receiver);

	public void send(List<String> receivers);

	void send(SseEmitter sseEmitter, String emitterId);

	void emitEventToClient(SseEmitter sseEmitter, String emitterId);

}
