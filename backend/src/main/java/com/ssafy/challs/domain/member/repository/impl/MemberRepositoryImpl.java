package com.ssafy.challs.domain.member.repository.impl;

import static com.ssafy.challs.domain.member.entity.QMember.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.member.dto.request.MemberCreateRequestDto;
import com.ssafy.challs.domain.member.dto.request.MemberUpdateRequestDto;
import com.ssafy.challs.domain.member.dto.response.MemberFindResponseDto;
import com.ssafy.challs.domain.member.repository.MemberRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public void createMember(MemberCreateRequestDto memberCreateRequestDto, Long memberId) {
		queryFactory.update(member)
			.set(member.memberName, memberCreateRequestDto.memberName())
			.set(member.memberAddress,
				memberCreateRequestDto.memberAddress())
			.set(member.memberPhone, memberCreateRequestDto.memberPhone())
			.set(member.memberBirth, memberCreateRequestDto.memberBirth())
			.set(member.isAgree, true)
			.where(member.id.eq(memberId))
			.execute();
	}

	@Override
	public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto, Long memberId) {
		queryFactory.update(member)
			.set(member.memberName, memberUpdateRequestDto.memberName())
			.set(member.memberAddress,
				memberUpdateRequestDto.memberAddress())
			.set(member.memberPhone, memberUpdateRequestDto.memberPhone())
			.where(member.id.eq(memberId))
			.execute();
	}

	@Override
	public void deleteMember(Long memberId) {
		queryFactory.update(member)
			.set(member.isWithdraw, true)
			.where(member.id.eq(memberId))
			.execute();
	}

	@Override
	public Optional<MemberFindResponseDto> findMember(Long memberId) {
		MemberFindResponseDto memberFindResponseDto = jpaQueryFactory.select(
				Projections.constructor(MemberFindResponseDto.class, member.memberName, member.memberBirth,
					member.memberEmail, member.memberPhone, member.memberAddress))
			.from(member)
			.where(member.id.eq(memberId))
			.fetchOne();
		return Optional.ofNullable(memberFindResponseDto);
	}

}
