package com.ssafy.challs.domain.alert.service;

import java.util.List;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;

public interface AlertService {

	public void createAlert(List<Long> receivers, Character alertType, Long alertTargetId, String alertContent);

	public List<AlertResponseDto> findAlerts(Long memberId, boolean unread);

	public void updateAlert(Long memberId, Long alertId);
}
