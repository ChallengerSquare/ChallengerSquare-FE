package com.ssafy.challs.domain.contest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantAgreeDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestSearchRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateStateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestCreateResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestParticipantsResponseDto;
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
		@RequestPart(required = false) MultipartFile contestImage,
		@RequestPart @Valid ContestUpdateRequestDto contestUpdateRequestDto) {
		Long memberId = securityMember.id();
		contestService.updateContest(contestUpdateRequestDto, contestImage, memberId);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 대회 이름, 카테고리, 종료 여부로 대회 검색
	 *
	 * @author 강다솔
	 * @param contestSearchRequestDto 검색할 조건
	 * @param pageable 페이지 정보
	 * @param orderBy 대회 정렬 조건
	 * @return 검색된 대회
	 */
	@GetMapping
	@Operation(summary = "대회 검색", description = "대회를 검색하는 API")
	public ResponseEntity<SuccessResponse<Page<ContestSearchResponseDto>>> searchContestList(
		@ModelAttribute ContestSearchRequestDto contestSearchRequestDto,
		@PageableDefault Pageable pageable,
		@RequestParam(required = false, defaultValue = "3") Integer orderBy) {
		Page<ContestSearchResponseDto> searchContest = contestService.searchContest(contestSearchRequestDto, pageable,
			orderBy);
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, searchContest));
	}

	/**
	 * 대회 상세 조회하는 API
	 *
	 * @author 강다솔
	 * @param contestId 대회 PK
	 * @return 대회 상세 정보
	 */
	@GetMapping("/{contestId}")
	@Operation(summary = "대회 상세조회", description = "대회를 상세조회하는 API")
	public ResponseEntity<SuccessResponse<ContestFindResponseDto>> findContest(
		@AuthenticationPrincipal SecurityMember securityMember,
		@PathVariable @Schema(description = "검색할 대회의 ID", example = "1") Long contestId) {
		ContestFindResponseDto contest = contestService.findContest(contestId, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, contest));
	}

	/**
	 * 대회 참가 신청하는 API
	 *
	 * @author 강다솔
	 * @param contestParticipantRequestDto 대회 신청 정보
	 * @return 성공 여부
	 */
	@PostMapping("/participants")
	@Operation(summary = "대회 참가 신청", description = "대회 참가 신청을 하는 API")
	public ResponseEntity<SuccessResponse<String>> createContestParticipant(
		@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody ContestParticipantRequestDto contestParticipantRequestDto) {
		contestService.createContestParticipant(contestParticipantRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 대회 참가를 취소하는 API
	 *
	 * @author 강다솔
	 * @param contestId 참가 취소할 대회 PK
	 * @return 성공 여부
	 */
	@DeleteMapping("/participants/{contestId}")
	@Operation(summary = "대회 참가 취소", description = "대회 참가를 취소하는 API")
	public ResponseEntity<SuccessResponse<String>> deleteContestParticipant(
		@AuthenticationPrincipal SecurityMember securityMember,
		@PathVariable @Schema(description = "참가 취소할 대회 ID", example = "1") Long contestId) {
		contestService.deleteContestParticipant(contestId, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 대회 참가 신청한 팀 조회하는 API
	 *
	 * @author 강다솔
	 * @param securityMember 로그인 회원 정보
	 * @param contestId 조회할 대회 PK
	 * @return 대회정보, 신청팀정보, 수상정보
	 */
	@GetMapping("/participants/{contestId}")
	@Operation(summary = "대회 참가 신청한 팀 조회", description = "대회에 참가 신청한 팀 리스트를 조회하는 API")
	public ResponseEntity<SuccessResponse<ContestParticipantsResponseDto>> searchContestParticipants(
		@AuthenticationPrincipal SecurityMember securityMember, @PathVariable Long contestId) {
		ContestParticipantsResponseDto contestTeamParticipants = contestService.searchContestParticipants(
			contestId, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, contestTeamParticipants));
	}

	/**
	 * 대회 참가 신청 승인 / 거절하는 API
	 *
	 * @author 강다솔
	 * @param securityMember 로그인한 회원 정보
	 * @param agreeTeams 참가 승인된 팀 리스트
	 * @return 성공 여부
	 */
	@PutMapping("/participants")
	@Operation(summary = "대회 참가 신청 승인/거절", description = "대회에 참가 신청한 팀의 선발 여부를 결정하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestParticipantsState(
		@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody @Valid ContestParticipantAgreeDto agreeTeams
	) {
		contestService.updateContestParticipantsState(agreeTeams, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 대회 상태를 변경하는 API
	 *
	 * @author 강다솔
	 * @param securityMember 로그인한 회원정보
	 * @param contestUpdateStateRequestDto 상태 변경할 대회 정보
	 * @return 성공 여부
	 */
	@PutMapping("/state")
	@Operation(summary = "대회 상태 변경", description = "대회 상태를 변경하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestState(
		@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody @Valid ContestUpdateStateRequestDto contestUpdateStateRequestDto
	) {
		contestService.updateContestState(contestUpdateStateRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * @param contestDisabledRequestDto
	 * @return
	 * @autohr
	 */
	@PutMapping("/registration")
	@Operation(summary = "대회 모집 불가로 변경", description = "대회 모집을 불가능하게 변경 하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestRegistration(
		@RequestBody ContestRequestDto contestDisabledRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * @param contestDisabledRequestDto
	 * @return
	 * @autohr
	 */
	@PutMapping("/cancel")
	@Operation(summary = "대회 취소", description = "대회를 취소하는 API")
	public ResponseEntity<SuccessResponse<String>> updateContestCancel(
		@RequestBody ContestRequestDto contestDisabledRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * @param contestAwardsRequest
	 * @return
	 * @autohr
	 */
	@PostMapping("/end")
	@Operation(summary = "대회 종료", description = "대회를 종료하는 API")
	public ResponseEntity<SuccessResponse<String>> createAwardsAndEndContest(
		@RequestBody @Schema(description = "수상정보 key 상이름, value 팀ID") Map<String, List<Integer>> contestAwardsRequest) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

}
