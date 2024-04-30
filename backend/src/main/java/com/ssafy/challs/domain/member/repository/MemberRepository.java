package com.ssafy.challs.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

	// providerId와 provider와 일치하는 isWithdraw가 false인 멤버 조회
	Optional<Member> findByMemberProviderAndMemberProviderIdAndIsWithdrawIsFalse(Character providerId,
		String memberProviderId);

	// 멤버코드로 멤버 조회
	Optional<Member> findByMemberCode(String memberCode);

}
