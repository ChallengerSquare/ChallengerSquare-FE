package com.ssafy.challs.domain.auth.oauth2.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.challs.domain.auth.jwt.dto.TokenCookie;
import com.ssafy.challs.domain.auth.jwt.service.TokenProvider;
import com.ssafy.challs.domain.auth.oauth2.dto.PrincipalDetails;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

	@Value("${server.base-url}")
	private String baseurl;

	private final TokenProvider tokenProvider;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		// oauth2 로그인이 정상적으로 종료시 전달받은 정보를 가지고 토큰 발급
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken)authentication;
		OAuth2User oAuth2User = oauthToken.getPrincipal();
		TokenCookie tokenCookie = tokenProvider.makeTokenCookie(oAuth2User.getName());
		response.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.accessCookie().toString());
		response.addHeader(HttpHeaders.SET_COOKIE, tokenCookie.refreshCookie().toString());

		// 여기에서 약관에 동의를 했으면 홈페이지 동의를 안했으면 회원가입 페이지
		PrincipalDetails oAuth2User1 = (PrincipalDetails)oAuth2User;
		Boolean isAgree = oAuth2User1.member().getIsAgree();
		String redirectUri;
		if (Boolean.TRUE.equals(isAgree)) {
			redirectUri = baseurl;
		} else {
			redirectUri = baseurl + "sign-up";
		}

		response.sendRedirect(redirectUri);
	}

}
