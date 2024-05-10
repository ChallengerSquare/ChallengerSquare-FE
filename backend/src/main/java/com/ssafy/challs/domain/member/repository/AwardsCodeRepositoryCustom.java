package com.ssafy.challs.domain.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.challs.domain.member.dto.response.MemberAwardsCodeResponseDto;

public interface AwardsCodeRepositoryCustom {
	Page<MemberAwardsCodeResponseDto> searchAwardList(Pageable pageable, Long memberId);
}
