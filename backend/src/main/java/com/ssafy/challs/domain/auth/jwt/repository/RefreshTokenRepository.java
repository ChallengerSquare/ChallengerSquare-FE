package com.ssafy.challs.domain.auth.jwt.repository;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {

	private final RedisTemplate<String, String> redisTemplate;

	public void save(String refreshToken, String uuid) {
		// refreshToken을 redis에 저장
		redisTemplate.opsForValue().set(refreshToken, uuid, Duration.ofDays(7));
	}

	public String getAndRemove(String refreshToken) {
		// refreshToken을 redis에서 조회 후 삭제
		return redisTemplate.opsForValue().getAndDelete(refreshToken);
	}

	public void remove(String refreshToken) {
		// refreshToken을 redis에서 삭제
		redisTemplate.delete(refreshToken);
	}

}
