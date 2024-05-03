package com.ssafy.challs.domain.contest.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestDisabledRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestPeriodDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.service.ContestService;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/contest")
@RequiredArgsConstructor
@Tag(name = "Contest Controller", description = "대회 관리 컨트롤러")
public class ContestController {

	private final ContestService contestService;

	/**
	 * 대회 생성하는 API
	 *
	 * @author 강다솔
	 * @param contestCreateRequestDto 대회 생성 정보
	 * @return 성공여부
	 */
	@PostMapping
	@Operation(summary = "대회 생성", description = "대회를 개최하는 API")
	public ResponseEntity<SuccessResponse<ContestCreateResponseDto>> createContest(
		@AuthenticationPrincipal SecurityMember securityMember,
		@RequestPart(required = false) MultipartFile contestImage,
		@RequestPart @Valid ContestCreateRequestDto contestCreateRequestDto) {
		Long memberId = securityMember.id();
		ContestCreateResponseDto createdContest = contestService.createContest(contestCreateRequestDto, contestImage,
			memberId);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.CREATED, createdContest));
	}

	/**
	 * 대회 수정하는 API
	 *
	 * @author 강다솔
	 * @param contestUpdateRequestDto 대회 수정 정보
	 * @return 성공 여부
	 */
	@PutMapping
	@Operation(summary = "대회 수정", description = "대회를 수정하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContest(
		@AuthenticationPrincipal SecurityMember securityMember,
		@ModelAttribute ContestUpdateRequestDto contestUpdateRequestDto) {
		Long memberId = securityMember.id();
		contestService.updateContest(contestUpdateRequestDto, memberId);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 *
	 * @autohr
	 * @param keyword
	 * @param category
	 * @return
	 */
	@GetMapping
	@Operation(summary = "대회 검색", description = "대회를 검색하는 API")
	public ResponseEntity<SuccessResponse<List<ContestSearchResponseDto>>> searchContestList(
		@RequestParam @Schema(description = "대회 이름 or 주최팀명으로 검색 할 키워드 Null인 경우 전체 검색", example = "삼성") String keyword,
		@RequestParam @Schema(description = "검색할 대회의 카테고리 Null인 경우 전체 검색", example = "IT") String category) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, List.of(
			new ContestSearchResponseDto(1L, "대회이름", "포스터", "팀이름",
				new ContestPeriodDto(LocalDate.now(), LocalDate.now()),
				new ContestPeriodDto(LocalDate.now(), LocalDate.now())))));
	}

	/**
	 *
	 * @autohr
	 * @param contestId
	 * @return
	 */
	@GetMapping("/{contestId}")
	@Operation(summary = "대회 상세조회", description = "대회를 상세조회하는 API")
	public ResponseEntity<SuccessResponse<ContestFindResponseDto>> findContest(
		@PathVariable @Schema(description = "검색할 대회의 ID", example = "1") Long contestId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, ContestFindResponseDto.builder().build()));
	}

	/**
	 *
	 * @autohr
	 * @param contestParticipantRequestDto
	 * @return
	 */
	@PostMapping("/participants")
	@Operation(summary = "대회 참가 신청", description = "대회 참가 신청을 하는 API")
	public ResponseEntity<SuccessResponse<String>> createContestParticipant(
		@RequestBody ContestParticipantRequestDto contestParticipantRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 *
	 * @autohr
	 * @param contestDisabledRequestDto
	 * @return
	 */
	@PutMapping("/registration")
	@Operation(summary = "대회 모집 불가로 변경", description = "대회 모집을 불가능하게 변경 하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestRegistration(
		@RequestBody ContestDisabledRequestDto contestDisabledRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 *
	 * @autohr
	 * @param contestDisabledRequestDto
	 * @return
	 */
	@PutMapping("/participants")
	@Operation(summary = "대회 참가 취소", description = "대회 참가를 취소하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestParticipant(
		@RequestBody ContestDisabledRequestDto contestDisabledRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 *
	 * @autohr
	 * @param contestDisabledRequestDto
	 * @return
	 */
	@PutMapping("/cancel")
	@Operation(summary = "대회 취소", description = "대회를 취소하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestCancel(
		@RequestBody ContestDisabledRequestDto contestDisabledRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 *
	 * @autohr
	 * @param contestAwardsRequest
	 * @return
	 */
	@PostMapping("/end")
	@Operation(summary = "대회 종료", description = "대회를 종료하는 API")
	public ResponseEntity<SuccessResponse<String>> createAwardsAndEndContest(
		@RequestBody @Schema(description = "수상정보 key 상이름, value 팀ID") Map<String, List<Integer>> contestAwardsRequest) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

}
