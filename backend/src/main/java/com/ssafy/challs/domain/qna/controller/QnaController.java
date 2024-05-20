package com.ssafy.challs.domain.qna.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;
import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.dto.request.QnaUpdateRequestDto;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;
import com.ssafy.challs.domain.qna.service.QnaService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
@Tag(name = "Qna Controller", description = "QNA 관리 컨트롤러")
public class QnaController {

	private final QnaService qnaService;

	/**
	 * 대회 질문 작성하는 API
	 *
	 * @author 강다솔
	 * @param securityMember 질문 작성하는 회원 정보
	 * @param qnaCreateRequestDto 등록하는 질문 정보
	 * @return 성공 여부
	 */
	@PostMapping
	@Operation(summary = "QNA 작성", description = "QNA를 작성하는 API")
	public ResponseEntity<SuccessResponse<String>> createQna(@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody @Valid QnaCreateRequestDto qnaCreateRequestDto) {
		qnaService.createQna(qnaCreateRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 대회 질문 목록을 가져오는 API
	 *
	 * @author 강다솔
	 * @param contestId 질문 목록 가져올 대회 ID
	 * @param pageable 페이징 정보
	 * @return 질문 목록 리스트
	 */
	@GetMapping("/{contestId}")
	@Operation(summary = "QNA 목록 조회", description = "QNA 목록을 조회하는 API")
	public ResponseEntity<SuccessResponse<Page<QnaResponseDto>>> searchQnaList(@PathVariable Long contestId,
		@PageableDefault Pageable pageable) {
		Page<QnaResponseDto> results = qnaService.searchQna(contestId, pageable);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, results));
	}

	/**
	 * 대회 질문 답변 작성하는 API
	 *
	 * @param qnaUpdateRequestDto 질문에 대한 답변 정보
	 * @return 성공 여부
	 */
	@PutMapping
	@Operation(summary = "QNA 답변 작성", description = "QNA의 답변을 작성하는 API")
	public ResponseEntity<SuccessResponse<String>> updateQna(
		@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody @Valid QnaUpdateRequestDto qnaUpdateRequestDto) {
		qnaService.updateQnaAnswer(qnaUpdateRequestDto.qnaId(), qnaUpdateRequestDto.answer(), securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

}
