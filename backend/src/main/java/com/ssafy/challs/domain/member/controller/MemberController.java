package com.ssafy.challs.domain.member.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;
import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;
import com.ssafy.challs.domain.member.service.MemberService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.response.SuccessResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Tag(name = "Member Controller", description = "멤버 관리 컨트롤러")
public class MemberController {

	private final MemberService memberService;
	private static final String SUCCESS_STRING = "success";

	@GetMapping("/refresh")
	@Operation(summary = "토큰 재발급 API", description = "refreshToken을 이용해서 토큰을 재발급 하는 API")
	public ResponseEntity<SuccessResponse<String>> createToken(@CookieValue String refreshToken) {
		// refresh token이 없으면 에러
		if (refreshToken == null) {
			throw new BaseException(ErrorCode.EXIST_TOKEN_ERROR);
		}
		HttpHeaders httpHeaders = memberService.createToken(refreshToken);
		return ResponseEntity.ok()
			.headers(httpHeaders)
			.body(new SuccessResponse<>(HttpStatus.OK, SUCCESS_STRING));
	}

	@DeleteMapping("/logout")
	@Operation(summary = "로그아웃 API", description = "로그아웃으로 refreshToken과 accessToken을 삭제하는 API")
	public ResponseEntity<SuccessResponse<String>> deleteToken(@CookieValue String refreshToken) {
		HttpHeaders httpHeaders = memberService.deleteRefreshToken(refreshToken);
		return ResponseEntity.ok()
			.headers(httpHeaders)
			.body(new SuccessResponse<>(HttpStatus.OK, SUCCESS_STRING));
	}

	@PutMapping("/create")
	@Operation(summary = "회원가입 API", description = "소셜 로그인 후 회원가입을 하는 API")
	public ResponseEntity<SuccessResponse<String>> createMember(@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody MemberCreateRequestDto memberCreateRequestDto) {
		memberService.createMember(memberCreateRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_STRING));
	}

	@PutMapping("/update")
	@Operation(summary = "회원수정 API", description = "회원 정보를 수정하는 API")
	public ResponseEntity<SuccessResponse<String>> updateMember(@AuthenticationPrincipal SecurityMember securityMember,
		@RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
		memberService.updateMember(memberUpdateRequestDto, securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_STRING));
	}

	@GetMapping
	@Operation(summary = "회원조회 API", description = "회원 정보를 조회하는 API")
	public ResponseEntity<SuccessResponse<MemberFindResponseDto>> findMember(
		@AuthenticationPrincipal SecurityMember securityMember) {
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, memberService.findMember(securityMember.id())));
	}

	@DeleteMapping
	@Operation(summary = "회원삭제 API", description = "회원을 삭제하는 API")
	public ResponseEntity<SuccessResponse<String>> deleteMember(
		@AuthenticationPrincipal SecurityMember securityMember) {
		memberService.deleteMember(securityMember.id());
		return ResponseEntity.ok(new SuccessResponse<>(HttpStatus.OK, SUCCESS_STRING));
	}

}
