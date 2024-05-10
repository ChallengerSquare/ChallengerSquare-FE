package com.ssafy.challs.domain.member.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;

import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberContestResponseDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;
import com.ssafy.challs.domain.member.dto.response.MemberTeamResponseDto;

public interface MemberService {

	HttpHeaders createToken(String refreshToken);

	HttpHeaders deleteRefreshToken(String refreshToken);

	void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId);

	void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId);

	MemberFindResponseDto findMember(Long memberId);

	void deleteMember(Long memberId);

	Page<MemberTeamResponseDto> searchTeamList(Long memberId, Pageable pageable);

	Page<MemberContestResponseDto> searchContestList(Pageable pageable, Long memberId);
}
