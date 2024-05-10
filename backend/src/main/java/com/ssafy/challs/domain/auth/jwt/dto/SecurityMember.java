package com.ssafy.challs.domain.auth.jwt.dto;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ssafy.challs.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;

public record SecurityMember(
	@Schema(description = "회원의 PK", example = "1L")
	Long id,
	Boolean isAgree
) implements UserDetails {
	public static SecurityMember of(Member member) {
		return new SecurityMember(member.getId(), member.getIsAgree());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(Boolean.TRUE.equals(isAgree) ? "ROLE_MEMBER" : "ROLE_LOGIN"));
	}

	@Override
	public String getPassword() {
		return isAgree.toString();
	}

	@Override
	public String getUsername() {
		return String.valueOf(id);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
