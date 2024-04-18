package com.ssafy.challs.domain.qna.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.dto.request.QnaUpdateRequestDto;
import com.ssafy.challs.domain.qna.dto.response.QnaDetailResponseDto;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
@Tag(name = "Qna Controller", description = "QNA 관리 컨트롤러")
public class QnaController {

	@PostMapping
	@Operation(summary = "QNA 작성", description = "QNA를 작성하는 API")
	public ResponseEntity<SuccessResponse<String>> createQna(
		@RequestBody QnaCreateRequestDto qnaCreateRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	@GetMapping("/{contestId}")
	@Operation(summary = "QNA 목록 조회", description = "QNA 목록을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<QnaResponseDto>>> searchQnaList(@PathVariable Long contestId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, List.of(new QnaResponseDto(1L, "QNA1"))));
	}

	@GetMapping("/{qnaId}/detail")
	@Operation(summary = "QNA 상세 조회", description = "QNA를 상세조회하는 API")
	public ResponseEntity<SuccessResponse<QnaDetailResponseDto>> findQna(@PathVariable Long qnaId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, new QnaDetailResponseDto("제목1", "질문1", "답변1")));
	}

	@PutMapping
	@Operation(summary = "QNA 답변 작성", description = "QNA의 답변을 작성하는 API")
	public ResponseEntity<SuccessResponse<String>> updateQna(@RequestBody QnaUpdateRequestDto qnaUpdateRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

}
