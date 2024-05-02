package com.ssafy.challs.domain.auth.jwt.service;

import java.time.Duration;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.challs.domain.auth.jwt.repository.RefreshTokenRepository;
import com.ssafy.challs.domain.auth.jwt.dto.TokenCookie;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenProvider {

	@Value("${jwt.secret-key}")
	private String key;

	private SecretKey secretKey;

	private final CookieUtil cookieUtil;

	private final RefreshTokenRepository refreshTokenRepository;

	@PostConstruct
	private void setSecretKey() {
		// 비밀키 생성
		secretKey = Keys.hmacShaKeyFor(key.getBytes());
	}

	// 토큰으로 쿠키 생성
	public TokenCookie makeTokenCookie(String id) {
		String refreshUuid = UUID.randomUUID().toString();
		String accessToken = createToken(id, Duration.ofMinutes(30));
		String refreshToken = createToken(refreshUuid, Duration.ofDays(7));
		refreshTokenRepository.save(refreshUuid, id);
		return cookieUtil.saveCookie(accessToken, refreshToken);
	}

	// 토큰 생성
	private String createToken(String id, Duration time) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + time.toMillis());

		return Jwts.builder().header().type("JWT").and().issuer("a205")
			.issuedAt(now).expiration(validity).claim("id", id)
			.signWith(secretKey)
			.compact();
	}

	// 토큰에서 값 조회
	public String getIdFromToken(String token) {
		try {
			return Jwts.parser()
				.verifyWith(secretKey).build()
				.parseSignedClaims(token).getPayload().get("id", String.class);
		} catch (Exception e) {
			throw new BaseException(ErrorCode.WRONG_TOKEN_ERROR);
		}
	}

	// 토큰 검증
	public boolean validationToken(String token) {
		try {
			Jwts.parser().verifyWith(secretKey)
				.build().parseSignedClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
