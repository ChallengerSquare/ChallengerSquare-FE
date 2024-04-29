package com.ssafy.challs.domain.alert.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

	public SseEmitter subscribe(String memberCode);

	public Map<String, Boolean> createConnectionMessage(String memberCode);

	public void send(List<String> receivers, Map<String, Boolean> message);

	void send(SseEmitter sseEmitter, String memberCode, Map<String, Boolean> message);

}
