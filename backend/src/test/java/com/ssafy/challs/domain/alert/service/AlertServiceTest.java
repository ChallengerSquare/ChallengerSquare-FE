package com.ssafy.challs.domain.alert.service;

import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.challs.domain.alert.entity.Alert;
import com.ssafy.challs.domain.alert.entity.AlertMember;
import com.ssafy.challs.domain.alert.repository.AlertMemberRepository;
import com.ssafy.challs.domain.alert.repository.AlertRepository;
import com.ssafy.challs.domain.alert.service.impl.AlertServiceImpl;

@ExtendWith(MockitoExtension.class)
class AlertServiceTest {
	@Mock
	private AlertRepository alertRepository;
	@Mock
	private AlertMemberRepository alertMemberRepository;
	@InjectMocks
	private AlertServiceImpl alertService;

	private static String memberCode = "testMember";

	@Test
	@DisplayName("알림_생성_성공")
	void testCreateAlert() {
		// 테스트 데이터 준비
		List<String> receivers = Arrays.asList("member1", "member2");
		Alert alert = new Alert(1L, 'N', "Content", 1L);
		when(alertRepository.save(any(Alert.class))).thenReturn(alert);

		// 테스트 실행
		alertService.createAlert(receivers, 'N', 1L, "Content");

		// 검증
		verify(alertRepository).save(any(Alert.class));
		verify(alertMemberRepository, times(receivers.size())).save(any(AlertMember.class));
	}

}