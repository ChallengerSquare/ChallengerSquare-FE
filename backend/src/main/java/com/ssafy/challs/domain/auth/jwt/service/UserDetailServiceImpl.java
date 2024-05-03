package com.ssafy.challs.domain.auth.jwt.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.challs.domain.auth.jwt.dto.SecurityMember;
import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.member.repository.MemberRepository;
import com.ssafy.challs.global.common.exception.BaseException;
import com.ssafy.challs.global.common.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberRepository.findByMemberCode(username)
			.orElseThrow(() -> new BaseException(ErrorCode.MEMBER_FOUND_ERROR));
		return SecurityMember.of(member);
	}
}
