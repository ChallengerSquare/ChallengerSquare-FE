package com.ssafy.challs.domain.auth.jwt.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.challs.domain.auth.jwt.service.CookieUtil;
import com.ssafy.challs.domain.auth.jwt.service.TokenProvider;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
	private final TokenProvider tokenProvider;

	private final UserDetailsService userDetailsService;
	private final CookieUtil cookieUtil;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
		@NonNull FilterChain filterChain) throws ServletException, IOException {
		String path = request.getRequestURI();
		String token = cookieUtil.getCookieValue(request.getCookies(), "accessToken");

		// 서버에서 발급한 토큰이 있는 경우
		if (token != null && tokenProvider.validationToken(token)) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(
				tokenProvider.getIdFromToken(token));

			// 해당 경로를 제외하고 사용자가 동의를 하지 않은 경우 에러 발생
			if (!path.startsWith("/api/oauth") && !path.startsWith("/api/member") && userDetails.getPassword()
				.equals("false")) {
				throw new BaseException(ErrorCode.MEMBER_NOT_AGREE_ERROR);
			}
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,
				null, userDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String requestUri = request.getRequestURI();
		String httpMethod = request.getMethod();

		// 로그인을 하지 않아도 볼 수 있어야 하는 경로
		List<String> excludeUris = List.of("/error", "/favicon.ico", "/api/contest", "/api/notice", "/api/qna",
			"/info/actuator/health", "/info/actuator/prometheus");
		return httpMethod.equals("GET") && excludeUris.stream().anyMatch(requestUri::startsWith);
	}

}
