package com.ssafy.challs.domain.notice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;
import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.dto.response.NoticeDetailResponseDto;
import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;
import com.ssafy.challs.domain.notice.service.NoticeService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Tag(name = "Notice Controller", description = "공지 관리 컨트롤러")
public class NoticeController {

	private final NoticeService noticeService;

	/**
	 * 공지사항 작성
	 *
	 * @author 강태연
	 * @param noticeCreateRequestDto 공지사항 작성에 필요한 정보
	 * @param securityMember 현재 요청을 보낸 멤버 정보
	 * @return 성공 메세지
	 */
	@PostMapping
	@Operation(summary = "공지사항 작성", description = "공지사항을 작성하는 API")
	public ResponseEntity<SuccessResponse<String>> createNotice(
		@RequestBody NoticeCreateRequestDto noticeCreateRequestDto,
		@AuthenticationPrincipal SecurityMember securityMember) {
		noticeService.createNotice(noticeCreateRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	@GetMapping("/{contestId}")
	@Operation(summary = "공지사항 목록 조회", description = "공지사항 목록을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<NoticeResponseDto>>> searchNoticeList(@PathVariable Long contestId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, List.of(new NoticeResponseDto(1L, "공지1"))));
	}

	@GetMapping("/{noticeId}/detail")
	@Operation(summary = "공지사항 상세 조회", description = "공지사항을 상세조회하는 API")
	public ResponseEntity<SuccessResponse<NoticeDetailResponseDto>> findNotice(@PathVariable Long noticeId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, new NoticeDetailResponseDto("제목1", "내용1")));
	}

}
