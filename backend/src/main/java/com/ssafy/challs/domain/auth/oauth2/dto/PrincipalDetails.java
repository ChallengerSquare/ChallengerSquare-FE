package com.ssafy.challs.domain.auth.oauth2.dto;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.challs.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;

public record PrincipalDetails(
	@Schema(description = "회원 정보", example = "1L")
	Member member,
	@Schema(description = "oauth2 속성값", example = "1L")
	Map<String, Object> attributes, String attributeKey
) implements OAuth2User {

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(
			new SimpleGrantedAuthority(Boolean.TRUE.equals(member.getIsAdmin()) ? "ROLE_ADMIN" : "ROLE_MEMBER"));
	}

	@Override
	public String getName() {
		return String.valueOf(member.getMemberCode());
	}

}
