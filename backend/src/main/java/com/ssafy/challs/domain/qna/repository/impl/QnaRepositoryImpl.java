package com.ssafy.challs.domain.qna.repository.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.member.entity.QMember;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;
import com.ssafy.challs.domain.qna.entity.QQna;
import com.ssafy.challs.domain.qna.repository.QnaRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class QnaRepositoryImpl implements QnaRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Page<QnaResponseDto> searchQna(Long contestId, Pageable pageable) {
		QQna qQna = QQna.qna;
		QMember qMember = QMember.member;

		// 질문 리스트 가져오기
		List<QnaResponseDto> results = queryFactory
			.select(
				Projections.constructor(QnaResponseDto.class,
					qQna.id,
					qQna.qnaTitle,
					qQna.qnaContent,
					qQna.qnaAnswer,
					Expressions.stringTemplate(
						"CONCAT(SUBSTRING({0}, 1, 1), REPEAT('*', CAST(CHAR_LENGTH({0}) AS INTEGER) - 1))",
						qMember.memberName))
			).from(qQna)
			.leftJoin(qMember).on(qMember.id.eq(qQna.memberId))
			.where(qQna.contest.id.eq(contestId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		// Page를 위한 count 쿼리
		JPAQuery<Long> countQuery = queryFactory
			.select(qQna.count())
			.from(qQna)
			.leftJoin(qMember).on(qMember.id.eq(qQna.memberId))
			.where(qQna.contest.id.eq(contestId));

		return PageableExecutionUtils.getPage(results, pageable, countQuery::fetchOne);
	}

	@Override
	public void updateQnaAnswer(Long qnaId, String answer) {
		QQna qQna = QQna.qna;

		queryFactory.update(qQna)
			.set(qQna.qnaAnswer, answer)
			.where(qQna.id.eq(qnaId))
			.execute();
	}

}
