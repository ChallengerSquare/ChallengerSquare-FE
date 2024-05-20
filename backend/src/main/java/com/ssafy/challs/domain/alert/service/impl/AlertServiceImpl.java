package com.ssafy.challs.domain.alert.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;
import com.ssafy.challs.domain.alert.entity.Alert;
import com.ssafy.challs.domain.alert.entity.AlertMember;
import com.ssafy.challs.domain.alert.repository.AlertMemberRepository;
import com.ssafy.challs.domain.alert.repository.AlertRepository;
import com.ssafy.challs.domain.alert.service.AlertService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

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
	@Transactional
	public void createAlert(List<Long> receivers, Character alertType, Long alertTargetId, String alertContent) {
		log.info("알림 생성 시작 - 타입: {}, 대상 ID: {}", alertType, alertTargetId);
		// 생성된 알림 저장
		Alert alert = Alert.builder()
			.alertType(alertType)
			.alertContent(alertContent)
			.alertTargetId(alertTargetId)
			.build();
		alertRepository.save(alert);
		log.debug("알림 저장 완료 - ID: {}", alert.getId());

		// 생성된 알림 받는 모든 회원 매핑 테이블로 연결
		for (Long receiver : receivers) {
			AlertMember alertMember = AlertMember.builder().alert(alert).isRead(false).memberId(receiver).build();
			alertMemberRepository.save(alertMember);
		}
		log.info("알림 및 받는 회원 정보 저장 완료");
	}

	/**
	 * 알림을 조건에 맞게 조회하는 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원정보
	 * @param unread 안읽은 알림 가져오는지 여부
	 * @return 조건에 맞는 알림 리스트
	 */
	@Override
	@Transactional(readOnly = true)
	public List<AlertResponseDto> findAlerts(Long memberId, boolean unread) {
		// 안읽은 알림인지 여부에 따라 alertMember 매핑테이블 정보 조회
		List<AlertMember> alertMemberList = unread ?
			alertMemberRepository.findAllByMemberIdAndIsRead(memberId, false) :
			alertMemberRepository.findAllByMemberId(memberId);

		// 매핑테이블 정보로 반환 DTO로 변환하여 반환
		return convertDtoList(alertMemberList);
	}

	/**
	 * AlertMemberList -> AlertResponseDtoList 변환 메서드
	 *
	 * @author 강다솔
	 * @param alertMemberList DB에서 조회한 매핑테이블 리스트 정보
	 * @return 변환된 DTO 리스트
	 */
	private List<AlertResponseDto> convertDtoList(List<AlertMember> alertMemberList) {
		List<AlertResponseDto> allAlert = new ArrayList<>();
		for (AlertMember alertMember : alertMemberList) {
			allAlert.add(alertMemberToDto(alertMember));
		}
		return allAlert;
	}

	/**
	 * AlertMember -> AlertResponseDto 변환 메서드
	 *
	 * @author 강다솔
	 * @param alertMember DB에서 조회한 매핑 테이블 정보
	 * @return 변환된 DTO
	 */
	private AlertResponseDto alertMemberToDto(AlertMember alertMember) {
		Alert alert = alertMember.getAlert();
		return AlertResponseDto.builder()
			.alertId(alert.getId())
			.alertContent(alert.getAlertContent())
			.alertTargetId(alert.getAlertTargetId())
			.alertType(alert.getAlertType())
			.isRead(alertMember.getIsRead()).build();
	}

	/**
	 * 읽음 상태를 변경(안읽음 -> 읽음)하는 메서드
	 *
	 * @author 강다솔
	 * @param memberId 회원
	 */
	@Override
	@Transactional
	public void updateAlert(Long memberId, Long alertId) {
		log.info("읽음 상태 업데이트 시작 - 알림 ID: {}, 회원 코드: {}", alertId, memberId);
		// alertId로 Alert 가져오기
		Alert alert = alertRepository.findById(alertId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_ALERT));

		// memberCode, alert로 매핑 테이블 검색 
		AlertMember alertMember = alertMemberRepository.findAlertMembersByMemberIdAndAlert(memberId, alert)
			.orElseThrow(() -> new BaseException(ErrorCode.ALERT_NOT_OWNER));

		// 읽음 상태 변경
		alertMember.updateIsRead();
		log.info("읽음 상태 업데이트 완료 - 알림 ID: {}, 회원 코드: {}", alertId, memberId);
	}

}
