package com.ssafy.challs.domain.member.repository;

import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;

public interface MemberRepositoryCustom {

	void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId);

	void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId);

	void deleteMember(Long memberId);
}
