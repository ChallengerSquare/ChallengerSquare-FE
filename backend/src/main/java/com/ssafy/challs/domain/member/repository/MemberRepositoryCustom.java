package com.ssafy.challs.domain.member.repository;

import java.util.Optional;

import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;

public interface MemberRepositoryCustom {

	void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId);

	void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId);

	void deleteMember(Long memberId);

	Optional<MemberFindResponseDto> findMember(Long memberId);
}
