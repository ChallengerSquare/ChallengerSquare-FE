package com.ssafy.challs.domain.notice.repository.impl;

import static com.ssafy.challs.domain.notice.entity.QNotice.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.notice.dto.response.NoticeResponseDto;
import com.ssafy.challs.domain.notice.repository.NoticeRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class NoticeRepositoryImpl implements NoticeRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	@Transactional(readOnly = true)
	public Page<NoticeResponseDto> searchNoticeList(Pageable pageable, Long contestId) {
		List<NoticeResponseDto> noticeResponseDtoList = queryFactory
			.select(Projections.constructor(NoticeResponseDto.class, notice.noticeTitle, notice.noticeContent))
			.from(notice)
			.where(notice.contest.id.eq(contestId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
		JPAQuery<Long> limit = queryFactory
			.select(notice.count())
			.from(notice)
			.where(notice.contest.id.eq(contestId));
		return PageableExecutionUtils.getPage(noticeResponseDtoList, pageable, limit::fetchOne);
	}

}
