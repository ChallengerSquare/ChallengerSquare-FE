package com.ssafy.challs.domain.team.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.team.dto.request.TeamCodeRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantsRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateLeaderRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamDetailResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamMemberResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamRegistrationResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@Tag(name = "Team Controller", description = "팀 관리 컨트롤러")
public class TeamController {

	/**
	 * 팀 생성
	 * @autohr 강태연
	 * @param teamRequestDto
	 * @return TeamCreateResponseDto
	 */
	@PostMapping
	@Operation(summary = "팀 생성", description = "대회 참가/개최를 위한 팀을 생성하는 API")
	public ResponseEntity<SuccessResponse<TeamCreateResponseDto>> createTeam(
		@RequestBody TeamCreateRequestDto teamRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, new TeamCreateResponseDto(1L)));
	}

	/**
	 * 팀 참가 신청
	 * @autohr
	 * @param teamCodeRequestDto
	 * @return
	 */
	@PostMapping("/participants")
	@Operation(summary = "팀 참가 신청", description = "팀 참가 코드로 팀 참가 신청을 하는 API")
	public ResponseEntity<SuccessResponse<String>> createParticipants(
		@RequestBody TeamCodeRequestDto teamCodeRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 팀 참가 수락
	 * @autohr
	 * @param teamParticipantsRequestDto
	 * @return
	 */
	@PutMapping("/participants")
	@Operation(summary = "팀 참가 수락", description = "팀 참가 요청을 보낸 멤버의 요청 수락 API")
	public ResponseEntity<SuccessResponse<String>> updateParticipants(
		@RequestBody List<TeamParticipantsRequestDto> teamParticipantsRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 팀 탈퇴 (Hard Delete)
	 * @autohr
	 * @param teamId
	 * @return
	 */
	@DeleteMapping("/participants/self")
	@Operation(summary = "팀 탈퇴", description = "현재 가입 되어있는 특정 팀을 탈퇴하는 API (본인이 팀장이 아닌 경우)")
	public ResponseEntity<SuccessResponse<String>> deleteParticipants(
		@RequestParam @Schema(description = "탈퇴 할 팀의 ID (본인이 팀원인 경우만 가능)") Long teamId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 팀 삭제 (Hard Delete)
	 * @autohr
	 * @param teamId
	 * @return
	 */
	@DeleteMapping("/{teamId}")
	@Operation(summary = "팀 삭제", description = "본인이 팀장인 특정 팀을 삭제하는 API")
	public ResponseEntity<SuccessResponse<String>> deleteTeam(
		@PathVariable @Schema(description = "삭제할 팀의 ID (본인이 팀장인 경우만 가능)") Long teamId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 팀 정보 조회
	 * @autohr
	 * @param teamId
	 * @return
	 */
	@GetMapping("/{teamId}")
	@Operation(summary = "팀 정보 조회", description = "팀의 상세 정보를 조회하는 API")
	public ResponseEntity<SuccessResponse<TeamResponseDto>> findTeam(
		@PathVariable @Schema(description = "조회할 팀의 ID") Long teamId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, new TeamResponseDto(1L, "이름", "설명", "코드", "로고")));
	}

	/**
	 * 팀 정보 수정
	 * @autohr
	 * @param teamRequestDto
	 * @return
	 */
	@PutMapping
	@Operation(summary = "팀 정보 수정", description = "팀의 정보를 수정하는 API")
	public ResponseEntity<SuccessResponse<TeamCreateResponseDto>> updateTeam(
		@RequestBody TeamUpdateRequestDto teamRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, new TeamCreateResponseDto(1L)));
	}

	/**
	 * 팀원 조회
	 * @autohr
	 * @param teamId
	 * @return
	 */
	@GetMapping("/{teamId}/participants")
	@Operation(summary = "팀원 조회", description = "팀의 구성원을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<TeamParticipantsResponseDto>>> searchTeamParticipantList(
		@PathVariable @Schema(description = "팀원을 조회할 팀의 ID") Long teamId) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, List.of(new TeamParticipantsResponseDto(1L, 1L, "이름", "이메일", false))));
	}

	/**
	 * 팀장 권한 양도
	 * @autohr
	 * @param teamUpdateLeaderRequestDto
	 * @return
	 */
	@PutMapping("/leader")
	@Operation(summary = "팀장 권한 양도", description = "팀장의 권한을 양도하는 API")
	public ResponseEntity<SuccessResponse<String>> updateTeamLeader(
		@RequestBody TeamUpdateLeaderRequestDto teamUpdateLeaderRequestDto) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, "success"));
	}

	/**
	 * 참가 신청 팀 목록 조회
	 * @param contestId
	 * @return
	 */
	@GetMapping("/{contestId}")
	@Operation(summary = "참가 신청 팀 목록 조회", description = "대회에 참가 신청을 한 모든 팀을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<TeamRegistrationResponseDto>>> searchRegistrationTeamList(
		@PathVariable Long contestId) {
		return ResponseEntity.ok(
			new SuccessResponse(HttpStatus.OK, List.of(TeamRegistrationResponseDto.builder()
				.teamName("팀 이름")
				.teamNum(2)
				.registrationId(1L)
				.leaderBirth(LocalDate.now())
				.leaderPhone("000-0000-0000")
				.participantState(1)
				.teamId(1L)
				.build())));
	}

	/**
	 * 참가 신청 팀 상세조회
	 * @param registrationId
	 * @return
	 */
	@GetMapping("/{registrationId}/detail")
	@Operation(summary = "참가 신청 팀 상세조회", description = "대회 참가 신청한 팀의 팀원과 신청 사유 조회하는 API")
	public ResponseEntity<SuccessResponse<TeamDetailResponseDto>> searchRegistrationTeamDetail(
		@PathVariable Long registrationId) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK,
			new TeamDetailResponseDto("참가 신청 사유",
				List.of(new TeamMemberResponseDto("이름", LocalDate.now(), "010-0000-0000", "주소")))));
	}

}
