package com.ssafy.challs.domain.member.repository.impl;

import static com.ssafy.challs.domain.contest.entity.QContest.*;
import static com.ssafy.challs.domain.member.entity.QAwardCode.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.member.dto.response.MemberAwardsCodeResponseDto;
import com.ssafy.challs.domain.member.repository.AwardsCodeRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AwardsCodeRepositoryImpl implements AwardsCodeRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Page<MemberAwardsCodeResponseDto> searchAwardList(Pageable pageable, Long memberId) {

		// 대회 번호 목록 조회
		List<Long> contestIdList = queryFactory.select(awardCode1.contestId)
			.from(awardCode1)
			.where(awardCode1.memberId.eq(memberId)).fetch();

		// char 형태를 Integer 형태로 전환
		NumberExpression<Integer> charToInteger = Expressions.numberTemplate(Integer.class, "CAST({0} AS INTEGER)",
			contest.contestCategory);

		// 리스트 조회
		List<MemberAwardsCodeResponseDto> list = queryFactory.select(
				Projections.constructor(MemberAwardsCodeResponseDto.class, contest.id,
					charToInteger,
					contest.contestTitle, contest.contestStart, contest.contestEnd,
					// 수상 코드
					JPAExpressions.select(awardCode1.awardCode)
						.from(awardCode1)
						.where(awardCode1.memberId.eq(memberId)
							.and(awardCode1.contestId.eq(contest.id)).and(awardCode1.isAward.eq(true))),
					// 참가 확인 코드
					JPAExpressions.select(awardCode1.awardCode)
						.from(awardCode1)
						.where(awardCode1.memberId.eq(memberId)
							.and(awardCode1.contestId.eq(contest.id)).and(awardCode1.isAward.eq(false)))))
			.from(contest)
			.where(contest.id.in(contestIdList))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(contest.id.desc())
			.fetch();

		// 카운트
		JPAQuery<Long> countQuery = queryFactory.select(contest.count())
			.from(contest)
			.where(contest.id.in(contestIdList));

		return PageableExecutionUtils.getPage(list, pageable, countQuery::fetchOne);
	}

}
