package com.ssafy.challs.domain.auth.jwt.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.ssafy.challs.domain.auth.jwt.dto.TokenCookie;

import jakarta.servlet.http.Cookie;

@Component
public class CookieUtil {

	private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
	private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
	@Value("${server.servlet.context-path}")
	private String path;
	private static final Duration TOKEN_EXPIRATION = Duration.ofDays(7);
	private static final Duration DELETION_EXPIRATION = Duration.ofMillis(1);

	// 토큰 조회
	public String getCookieValue(Cookie[] cookies, String name) {
		if (cookies == null) {
			return null;
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(name)) {
				return cookie.getValue();
			}
		}
		return null;
	}

	// 쿠키 저장
	public TokenCookie saveCookie(String accessToken, String refreshToken) {
		ResponseCookie accessCookie = getResponseCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, path,
			TOKEN_EXPIRATION);
		ResponseCookie refreshCookie = getResponseCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, path + "/member",
			TOKEN_EXPIRATION);
		return new TokenCookie(accessCookie, refreshCookie);
	}

	// 쿠키 삭제
	public TokenCookie deleteCookie() {
		ResponseCookie accessCookie = getResponseCookie(ACCESS_TOKEN_COOKIE_NAME, "", path, DELETION_EXPIRATION);
		ResponseCookie refreshCookie = getResponseCookie(REFRESH_TOKEN_COOKIE_NAME, "", path + "/member",
			DELETION_EXPIRATION);
		return new TokenCookie(accessCookie, refreshCookie);
	}

	// 쿠키 생성
	private ResponseCookie getResponseCookie(String cookieName, String refreshToken, String path,
		Duration age) {
		return ResponseCookie.from(cookieName, refreshToken)
			.sameSite("None").httpOnly(true).secure(true).path(path)
			.maxAge(age).build();
	}

}
