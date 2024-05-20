package com.ssafy.challs.domain.auth.jwt.dto;

import org.springframework.http.ResponseCookie;

import io.swagger.v3.oas.annotations.media.Schema;

public record TokenCookie(
	@Schema(description = "access token을 저장할 cookie", example = "accessToken=asd123qwa2a; PAth=/api; HttpOnly; Secure;")
	ResponseCookie accessCookie,
	@Schema(description = "refresh token을 저장할 cookie", example = "refreshToken=asd123qwa2a; PAth=/api; HttpOnly; Secure;")
	ResponseCookie refreshCookie
) {
}
