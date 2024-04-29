package com.ssafy.challs.domain.alert.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;
import com.ssafy.challs.domain.alert.entity.Alert;
import com.ssafy.challs.domain.alert.entity.AlertMember;
import com.ssafy.challs.domain.alert.repository.AlertMemberRepository;
import com.ssafy.challs.domain.alert.repository.AlertRepository;
import com.ssafy.challs.domain.alert.service.AlertService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {

	private final AlertRepository alertRepository;
	private final AlertMemberRepository alertMemberRepository;

	/**
	 * 알림 생성해서 저장하는 메서드
	 *
	 * @author 강다솔
	 * @param receivers 알림 받는 회원
	 * @param alertType 알림의 타입 (N : 대회 공지사항, Q : 대회 QnA, T : 팀 알림, C : 대회 알림)
	 * @param alertTargetId 타입별 리다이렉트할 PK
	 * @param alertContent 알림 내용
	 */
	@Override
	public void createAlert(List<String> receivers, Character alertType, Long alertTargetId, String alertContent) {
		// 생성된 알림 저장
		Alert alert = Alert.builder()
			.alertType(alertType)
			.alertContent(alertContent)
			.alertTargetId(alertTargetId)
			.build();
		alertRepository.save(alert);

		// 생성된 알림 받는 모든 회원 매핑 테이블로 연결
		for (String receiver : receivers) {
			AlertMember alertMember = AlertMember.builder().alert(alert).isRead(false).memberCode(receiver).build();
			alertMemberRepository.save(alertMember);
		}
	}

	/**
	 * 회원의 모든 알림을 조회하는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode 회원
	 * @return 모든 알림 리스트
	 */
	@Override
	public List<AlertResponseDto> findAllAlert(String memberCode) {
		return null;
	}

	/**
	 * 안읽은 알림을 조회하는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode 회원
	 * @return 안읽은 알림 리스트
	 */
	@Override
	public List<AlertResponseDto> findAlertByUnread(String memberCode) {
		return null;
	}

	/**
	 * 읽음 상태를 변경(안읽음 -> 읽음)하는 메서드
	 *
	 * @author 강다솔
	 * @param memberCode 회원
	 */
	@Override
	public void updateAlert(String memberCode) {

	}
}
