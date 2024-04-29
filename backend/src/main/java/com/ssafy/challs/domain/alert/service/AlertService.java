package com.ssafy.challs.domain.alert.service;

import java.util.List;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;

public interface AlertService {

	public void createAlert(List<String> receivers, Character alertType, Long alertTargetId, String alertContent);

	public List<AlertResponseDto> findAlerts(String memberCode, boolean unread);

	public void updateAlert(String memberCode, Long alertId);
}
