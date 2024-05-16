package com.ssafy.challs.domain.team.repository.impl;

import static com.ssafy.challs.domain.contest.entity.QContest.*;
import static com.ssafy.challs.domain.contest.entity.QContestParticipants.*;
import static com.ssafy.challs.domain.team.entity.QTeam.*;
import static com.ssafy.challs.domain.team.entity.QTeamParticipants.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.member.dto.response.MemberTeamResponseDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;
import com.ssafy.challs.domain.team.repository.TeamRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private final JPAQueryFactory jpaQueryFactory;

	@Value("${cloud.aws.s3.url}")
	private String s3Url;

	@Override
	public void updateImage(String imageUrl, Long teamId) {
		queryFactory
			.update(team)
			.set(team.teamImage, imageUrl)
			.where(team.id.eq(teamId))
			.execute();
	}

	@Override
	public void updateTeam(TeamUpdateRequestDto teamUpdateRequestDto) {
		queryFactory.update(team)
			.set(team.teamName, teamUpdateRequestDto.teamName())
			.set(team.teamDescription, teamUpdateRequestDto.teamDescription())
			.set(team.teamPhone, teamUpdateRequestDto.teamPhone())
			.where(team.id.eq(teamUpdateRequestDto.teamId()))
			.execute();
	}

	@Override
	public Page<MemberTeamResponseDto> searchTeamList(Long memberId, Pageable pageable) {
		List<MemberTeamResponseDto> memberTeamResponseDtoList = queryFactory.select(
				Projections.constructor(MemberTeamResponseDto.class,
					team.id,
					team.teamName,
					// 팀 로고 prefix 붙이기
					Expressions.stringTemplate("CONCAT({0}, {1})", s3Url, team.teamImage),
					// 팀 인원수
					JPAExpressions.select(teamParticipants.count().castToNum(Integer.class))
						.from(teamParticipants)
						.where(teamParticipants.team.id.eq(team.id)),
					// 팀 대회 개최 수
					JPAExpressions
						.select(contest.count().castToNum(Integer.class))
						.from(contest)
						.where(contest.team.id.eq(team.id)),
					// 팀 대회 참가 완료 수
					JPAExpressions.select(contestParticipants.count().castToNum(Integer.class))
						.from(contestParticipants)
						.where(contestParticipants.team.id.eq(team.id)
							.and(contestParticipants.contestParticipantsState.eq("A"))),
					team.teamDescription))
			.from(team)
			.where(team.id.in(JPAExpressions.select(teamParticipants.team.id)
				.from(teamParticipants)
				.where(teamParticipants.member.id.eq(memberId))))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		JPAQuery<Long> limit = queryFactory
			.select(team.count())
			.from(team)
			.where(team.id.in(JPAExpressions.select(teamParticipants.team.id)
				.from(teamParticipants)
				.where(teamParticipants.member.id.eq(memberId))));
		return PageableExecutionUtils.getPage(memberTeamResponseDtoList, pageable, limit::fetchOne);
	}

	@Override
	public Optional<TeamPublicResponseDto> findTeamPublic(Long teamId) {
		TeamPublicResponseDto teamPublicResponseDto = jpaQueryFactory.select(
				Projections.constructor(TeamPublicResponseDto.class, team.id, team.teamName, team.teamDescription,
					Expressions.stringTemplate("CONCAT({0}, {1})", s3Url, team.teamImage)))
			.from(team)
			.where(team.id.eq(teamId))
			.fetchOne();
		return Optional.ofNullable(teamPublicResponseDto);
	}

}
