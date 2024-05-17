package com.ssafy.challs.global.config;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.challs.domain.auth.jwt.filter.TokenAuthenticationFilter;
import com.ssafy.challs.domain.auth.jwt.service.CookieUtil;
import com.ssafy.challs.domain.auth.jwt.service.TokenProvider;
import com.ssafy.challs.domain.auth.oauth2.handler.OAuth2SuccessHandler;
import com.ssafy.challs.domain.auth.oauth2.service.CustomOAuth2UserService;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;
import com.ssafy.challs.global.common.response.ErrorResponse;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final TokenProvider tokenProvider;

	private final UserDetailsService userDetailsService;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	private final CookieUtil cookieUtil;

	@Value("${server.base-url}")
	private String baseUrl;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.exceptionHandling(
			exception -> exception
				.authenticationEntryPoint(customTempAuthenticationEntryPoint())
				.accessDeniedHandler(customAccessDeniedHandler()));
		http.sessionManagement(
			session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.authorizeHttpRequests(
			// 여기에서 열어줘야 하는 곳은 대회 조회, 대회 상세조회, 대회 QNA조회, 대회 공지 조회, 대회 공지 상세 조회, 소셜 로그인의 모든 과정, 추가 정보 입력
			requests -> requests.requestMatchers("/error", "/favicon.ico", "/login/oauth2/**", "/swagger-ui/**",
					"/v3/api-docs/**", "/swagger-ui.html", "/info/actuator/health", "/info/actuator/prometheus", "/qna/*",
					"/team/*/public", "/team/*/members", "/team/*/contest", "/notice/*", "/contest", "/contest/*",
					"/team/participants", "/member/refresh")
				.permitAll()
				.requestMatchers("/member/create", "/member/logout", "sse/subscribe")
				.authenticated()
				.anyRequest().hasAuthority("ROLE_MEMBER")
		);

		http.csrf(AbstractHttpConfigurer::disable);
		http.cors(corsCustomizer -> corsCustomizer.configurationSource(request -> {
			CorsConfiguration config = new CorsConfiguration();
			config.setAllowedOrigins(
				List.of("http://localhost:3000", "https://localhost:3000", "https://www.challengersquare.com"));
			config.setAllowedMethods(Collections.singletonList("*"));
			config.setAllowCredentials(true);
			config.setAllowedHeaders(Collections.singletonList("*"));
			return config;
		}));
		http.headers(headers -> headers.cacheControl(HeadersConfigurer.CacheControlConfig::disable));
		http.httpBasic(AbstractHttpConfigurer::disable);
		http.formLogin(AbstractHttpConfigurer::disable);
		http.logout(AbstractHttpConfigurer::disable);
		http.oauth2Login(
			oauth -> oauth.userInfoEndpoint(point -> point.userService(customOAuth2UserService))
				.successHandler(oAuth2SuccessHandler));
		http.addFilterBefore(new TokenAuthenticationFilter(tokenProvider, userDetailsService, cookieUtil),
			UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationEntryPoint customTempAuthenticationEntryPoint() {
		return (request, response, authException) -> {
			try {
				String accessToken = cookieUtil.getCookieValue(request.getCookies(), "accessToken");
				tokenProvider.validateToken(accessToken);
				errorResponse(response, ErrorCode.MEMBER_NOT_LOGIN);
			} catch (BaseException e) {
				if (e.getErrorCode().equals(ErrorCode.EXPIRED_TOKEN_ERROR)) {
					errorResponse(response, ErrorCode.EXPIRED_TOKEN_ERROR);
				} else {
					errorResponse(response, ErrorCode.WRONG_TOKEN_ERROR);
				}
			}
		};
	}

	@Bean
	public AccessDeniedHandler customAccessDeniedHandler() {
		return (request, response, accessDeniedException) -> errorResponse(response, ErrorCode.MEMBER_NOT_AGREE_ERROR);
	}

	private static void errorResponse(HttpServletResponse response, ErrorCode errorCode)
		throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		ErrorResponse errorResponse = new ErrorResponse(errorCode);
		objectMapper.writeValueAsString(errorResponse);

		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(errorCode.getStatus());
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
	}

}
