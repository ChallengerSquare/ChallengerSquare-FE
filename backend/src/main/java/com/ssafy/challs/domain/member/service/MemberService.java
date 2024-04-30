package com.ssafy.challs.domain.member.service;

import org.springframework.http.HttpHeaders;

import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;

public interface MemberService {

	HttpHeaders createToken(String refreshToken);

	HttpHeaders deleteRefreshToken(String refreshToken);

	void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId);

	void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId);

	MemberFindResponseDto findMember(Long memberId);

	void deleteMember(Long memberId);
}
