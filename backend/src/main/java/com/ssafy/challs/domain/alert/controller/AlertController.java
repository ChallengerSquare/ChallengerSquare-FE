package com.ssafy.challs.domain.alert.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.alert.dto.request.AlertUpdateRequestDto;
import com.ssafy.challs.domain.alert.dto.response.AlertResponseDto;
import com.ssafy.challs.domain.alert.service.AlertService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/alert")
@RequiredArgsConstructor
@Tag(name = "Alert Controller", description = "알림 관리 컨트롤러")
public class AlertController {

	private final AlertService alertService;

	/**
	 * 사용자에게 왔었던 모든 알림을 조회하는 API
	 *
	 * @author 강다솔
	 * @return 조건에 맞는 Alert 정보 리스트
	 */
	@GetMapping
	@Operation(summary = "알림 조회 API", description = "사용자에게 왔었던 모든 알림/안 읽은 알림 조회")
	public ResponseEntity<SuccessResponse<List<AlertResponseDto>>> searhAlertList(
		@RequestParam String memberCode,
		@RequestParam(required = false, defaultValue = "false") @Schema(description = "안읽은 알림만 조회하기 위한 조건", example = "true") Boolean unread) {
		// TODO : 추후 토큰에서 로그인한 member 정보 가져오도록 변경
		List<AlertResponseDto> alertList = alertService.findAlerts(memberCode, unread);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, alertList));
	}

	/**
	 * 알림을 읽음처리하는 API
	 *
	 * @author 강다솔
	 * @param alertUpdateRequestDto
	 * @return
	 */
	@PutMapping
	@Operation(summary = "알림을 읽음처리하는 API", description = "해당 알림을 조회하여 읽음처리")
	public ResponseEntity<SuccessResponse<String>> updateAlertReadState(
		@RequestParam String memberCode,
		@RequestBody AlertUpdateRequestDto alertUpdateRequestDto) {
		// TODO : 추후 토큰에서 로그인한 member 정보 가져오기
		alertService.updateAlert(memberCode, alertUpdateRequestDto.alertId());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

}
