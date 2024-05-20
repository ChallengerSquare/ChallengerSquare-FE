package com.ssafy.challs.domain.auth.oauth2.dto;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record OAuth2UserInfo(
	@Schema(description = "oauth2 에서 가져온 이메일", example = "email@email.email")
	String email,
	@Schema(description = "공급자", example = "G")
	Character provider,
	@Schema(description = "공급자 측의 ID", example = "1287946531321654897654")
	String providerId
) {

	private static final Logger log = LoggerFactory.getLogger(OAuth2UserInfo.class);

	public static OAuth2UserInfo of(String registrationId, Map<String, Object> attributes) {
		return switch (registrationId) { // registration id별로 userInfo 생성
			case "google" -> ofGoogle(attributes);
			case "kakao" -> ofKakao(attributes);
			default -> throw new BaseException(ErrorCode.BAD_REQUEST_ERROR);
		};
	}

	private static OAuth2UserInfo ofGoogle(Map<String, Object> attributes) {
		return OAuth2UserInfo.builder()
			.email((String)attributes.get("email"))
			.provider('G')
			.providerId((String)attributes.get("sub"))
			.build();
	}

	private static OAuth2UserInfo ofKakao(Map<String, Object> attributes) {
		LinkedHashMap<String, Object> kakaoAccount = (LinkedHashMap<String, Object>)attributes.get("kakao_account");

		return OAuth2UserInfo.builder()
			.email((String)kakaoAccount.get("email"))
			.provider('K')
			.providerId(String.valueOf(attributes.get("id")))
			.build();
	}

	public Member toEntity() {
		return Member.builder()
			.memberEmail(email)
			.memberProvider(provider)
			.memberProviderId(providerId)
			.isAgree(false)
			.isWithdraw(false)
			.isAdmin(false)
			.memberCode(UUID.randomUUID().toString())
			.build();
	}
}
