package com.ssafy.challs.domain.auth.jwt.filter;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.challs.domain.auth.jwt.service.CookieUtil;
import com.ssafy.challs.domain.auth.jwt.service.TokenProvider;

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
		String token = cookieUtil.getCookieValue(request.getCookies(), "accessToken");

		// 서버에서 발급한 토큰이 있는 경우
		if (token != null && tokenProvider.validationToken(token)) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(
				tokenProvider.getIdFromToken(token));
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,
				null, userDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		filterChain.doFilter(request, response);
	}

}
