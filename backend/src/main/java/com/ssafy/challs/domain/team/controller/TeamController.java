package com.ssafy.challs.domain.team.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.ssafy.challs.domain.team.dto.request.TeamCodeRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantsRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateLeaderRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamContestResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamInfoResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamMemberResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;
import com.ssafy.challs.domain.team.service.TeamService;
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

	private final TeamService teamService;

	private static final String SUCCESS_ANSWER = "success";

	/**
	 * 팀 생성
	 *
	 * @author 강다솔
	 * @param teamRequestDto 팀 생성 정보
	 * @return TeamCreateResponseDto 생성된 팀의 아이디
	 */
	@PostMapping
	@Operation(summary = "팀 생성", description = "대회 참가/개최를 위한 팀을 생성하는 API")
	public ResponseEntity<SuccessResponse<TeamCreateResponseDto>> createTeam(
		@RequestPart(required = false) MultipartFile teamImage,
		@RequestPart TeamCreateRequestDto teamRequestDto,
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK,
				teamService.createTeam(teamRequestDto, securityMember.id(), teamImage)));
	}

	/**
	 * 팀 참가 코드로 팀 정보 조회
	 *
	 * @author 강태연
	 * @param teamCode 조회할 팀 코드
	 * @param securityMember 현재 사용자의 정보
	 * @return 팀 이름, 팀 로고
	 */
	@GetMapping("/participants")
	@Operation(summary = "참가 신청 팀 조회", description = "팀 참가 코드로 팀의 정보를 조회 하는 API")
	public ResponseEntity<SuccessResponse<TeamInfoResponseDto>> findTeamInfo(@RequestParam String teamCode,
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.findTeamInfo(teamCode, securityMember.id())));
	}

	/**
	 * 팀 참가 신청
	 *
	 * @author 강태연
	 * @param teamCodeRequestDto 팀 코드
	 * @return 성공 메세지
	 */
	@PostMapping("/participants")
	@Operation(summary = "팀 참가 신청", description = "팀 참가 코드로 팀 참가 신청을 하는 API")
	public ResponseEntity<SuccessResponse<String>> createParticipants(
		@RequestBody TeamCodeRequestDto teamCodeRequestDto, @AuthenticationPrincipal SecurityMember securityMember) {
		teamService.createParticipants(teamCodeRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_ANSWER));
	}

	/**
	 * 팀 참가 수락
	 *
	 * @author 강태연
	 * @param teamParticipantsRequestDto 팀 참가 신청 수락에 필요한 정보
	 * @return 성공 메세지
	 */
	@PutMapping("/participants")
	@Operation(summary = "팀 참가 수락", description = "팀 참가 요청을 보낸 멤버의 요청 수락 API")
	public ResponseEntity<SuccessResponse<String>> updateParticipants(
		@RequestBody TeamParticipantsRequestDto teamParticipantsRequestDto,
		@AuthenticationPrincipal SecurityMember securityMember) {
		teamService.updateParticipants(teamParticipantsRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_ANSWER));
	}

	/**
	 * 팀 탈퇴 (Hard Delete)
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 성공 메세지
	 */
	@DeleteMapping("/participants/self")
	@Operation(summary = "팀 탈퇴", description = "현재 가입 되어있는 특정 팀을 탈퇴하는 API (본인이 팀장이 아닌 경우)")
	public ResponseEntity<SuccessResponse<String>> deleteParticipants(
		@RequestParam @Schema(description = "탈퇴 할 팀의 ID (본인이 팀원인 경우만 가능)") Long teamId,
		@AuthenticationPrincipal SecurityMember securityMember) {
		teamService.deleteParticipants(teamId, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_ANSWER));
	}

	/**
	 * 팀 삭제 (Hard Delete)
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 성공 메세지
	 */
	@DeleteMapping("/{teamId}")
	@Operation(summary = "팀 삭제", description = "본인이 팀장인 특정 팀을 삭제하는 API")
	public ResponseEntity<SuccessResponse<String>> deleteTeam(
		@PathVariable @Schema(description = "삭제할 팀의 ID (본인이 팀장인 경우만 가능)") Long teamId,
		@AuthenticationPrincipal SecurityMember securityMember) {
		teamService.deleteTeam(teamId, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_ANSWER));
	}

	/**
	 * 팀원인 경우 팀 정보 조회
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 팀 정보 조회 결과
	 */
	@GetMapping("/{teamId}")
	@Operation(summary = "팀 정보 조회", description = "팀의 상세 정보를 조회하는 API")
	public ResponseEntity<SuccessResponse<TeamResponseDto>> findTeam(
		@PathVariable @Schema(description = "조회할 팀의 ID") Long teamId,
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.findTeam(teamId, securityMember.id())));
	}

	/**
	 * 팀 정보 조회(모두에게 오픈)
	 *
	 * @author 강태연
	 * @param teamId 팀 번호
	 * @return 팀 정보 조회 결과
	 */
	@GetMapping("/{teamId}/public")
	@Operation(summary = "팀 정보 조회", description = "팀의 상세 정보를 조회하는 API")
	public ResponseEntity<SuccessResponse<TeamPublicResponseDto>> findTeamPublic(
		@PathVariable @Schema(description = "조회할 팀의 ID") Long teamId) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.findTeamPublic(teamId)));
	}

	/**
	 * 팀 정보 수정
	 *
	 * @author 강태연
	 * @param teamRequestDto 팀 정보 수정에 필요한 dto
	 * @return 수정된 팀의 번호
	 */
	@PutMapping
	@Operation(summary = "팀 정보 수정", description = "팀의 정보를 수정하는 API")
	public ResponseEntity<SuccessResponse<TeamCreateResponseDto>> updateTeam(
		@RequestPart(required = false) MultipartFile teamImage,
		@RequestPart TeamUpdateRequestDto teamRequestDto,
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK,
			teamService.updateTeam(teamRequestDto, teamImage, securityMember.id())));
	}

	/**
	 * 팀장인 경우 팀원 조회
	 *
	 * @author 강태연
	 * @param teamId 조회할 팀의 번호
	 * @param securityMember 현재 요청한 멤버의 정보
	 * @return 해당 팀의 팀장을 제일 처음, 그 다음은 팀원들, 그 다음은 참가 신청한 사람을 돌려준다
	 */
	@GetMapping("/{teamId}/participants")
	@Operation(summary = "팀장인 경우 팀원 조회", description = "팀의 구성원을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<TeamParticipantsResponseDto>>> searchTeamParticipantList(
		@PathVariable @Schema(description = "팀원을 조회할 팀의 ID") Long teamId,
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.searchTeamParticipantList(teamId, securityMember.id())));
	}

	/**
	 * 팀원 조회
	 *
	 * @author 강태연
	 * @param teamId 조회할 팀의 번호
	 * @return 팀원의 이름, 팀장이 제일 처음, 그 다음은 팀원들 (PK 기준 정렬)
	 */
	@GetMapping("/{teamId}/members")
	@Operation(summary = "팀원 조회", description = "팀의 구성원을 조회하는 API")
	public ResponseEntity<SuccessResponse<List<TeamMemberResponseDto>>> searchTeamMemberList(
		@PathVariable Long teamId) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.searchTeamMemberList(teamId)));
	}

	/**
	 * 팀장 권한 양도
	 *
	 * @author 강태연
	 * @param teamUpdateLeaderRequestDto 팀장 양도를 위한 정보
	 * @return 성공 메세지
	 */
	@PutMapping("/leader")
	@Operation(summary = "팀장 권한 양도", description = "팀장의 권한을 양도하는 API")
	public ResponseEntity<SuccessResponse<String>> updateTeamLeader(
		@RequestBody TeamUpdateLeaderRequestDto teamUpdateLeaderRequestDto,
		@AuthenticationPrincipal SecurityMember securityMember) {
		teamService.updateTeamLeader(teamUpdateLeaderRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_ANSWER));
	}

	/**
	 * 팀이 개최한 대회의 목록 조회
	 *
	 * @param teamId 팀의 번호
	 * @return 팀이 개최한 대회 목록(로고, 이름)
	 */
	@GetMapping("/{teamId}/contest")
	@Operation(summary = "개최한 대회 목록 조회", description = "해당 팀이 개최한 대회 목록 조회")
	public ResponseEntity<SuccessResponse<Page<TeamContestResponseDto>>> searchTeamContestList(
		@PathVariable Long teamId, @PageableDefault Pageable pageable) {
		return ResponseEntity.ok(
			new SuccessResponse<>(HttpStatus.OK, teamService.searchTeamContestList(teamId, pageable)));
	}

}
