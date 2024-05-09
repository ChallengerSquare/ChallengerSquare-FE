package com.ssafy.challs.domain.contest.repository.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.contest.dto.ContestTeamInfoDto;
import com.ssafy.challs.domain.contest.entity.ContestParticipants;
import com.ssafy.challs.domain.contest.entity.QContestParticipants;
import com.ssafy.challs.domain.contest.repository.ContestParticipantsRepositoryCustom;
import com.ssafy.challs.domain.team.entity.QTeam;
import com.ssafy.challs.domain.team.entity.QTeamParticipants;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ContestParticipantsRepositoryImpl implements ContestParticipantsRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public boolean checkAlreadyParticipantsMember(Long contestId, Long teamId) {
		QContestParticipants contestParticipants = QContestParticipants.contestParticipants;
		QTeamParticipants teamParticipants = QTeamParticipants.teamParticipants;

		// 현재 대회에 참가 신청 중인 팀의 멤버들 조회
		List<Long> contestParticipantsMembers = queryFactory
			.select(teamParticipants.member.id)
			.from(teamParticipants)
			.where(teamParticipants.team.id.in(
				queryFactory
					.select(contestParticipants.team.id)
					.from(contestParticipants)
					.where(contestParticipants.contest.id.eq(contestId))
					.fetch()
			))
			.fetch();

		// 주어진 teamId에 속한 팀의 멤버 목록 조회
		List<Long> teamMemberIds = queryFactory
			.select(teamParticipants.member.id)
			.from(teamParticipants)
			.where(
				teamParticipants.team.id.eq(teamId),
				teamParticipants.member.id.in(contestParticipantsMembers)  // 중복 확인 조건
			)
			.fetch();

		return !teamMemberIds.isEmpty();  // 결과 목록이 비어 있지 않다면, 중복된 멤버가 존재함
	}

	@Override
	public ContestParticipants findContestParticipants(Long contestId, Long memberId) {
		QContestParticipants contestParticipants = QContestParticipants.contestParticipants;
		QTeamParticipants teamParticipants = QTeamParticipants.teamParticipants;

		// 쿼리 조건 설정 (contestId에 참가 신청한 memberId가 팀장인 팀)
		BooleanExpression teamInContestCondition = contestParticipants.contest.id.eq(contestId);
		BooleanExpression teamWithLeaderCondition = teamParticipants.member.id.eq(memberId)
			.and(teamParticipants.isLeader.eq(true));

		// 찾은 ContestParticipants 가져오기
		return queryFactory
			.selectFrom(contestParticipants)
			.join(teamParticipants).on(contestParticipants.team.id.eq(teamParticipants.team.id))
			.where(teamInContestCondition.and(teamWithLeaderCondition))
			.fetchOne();
	}

	@Override
	public List<ContestTeamInfoDto> searchTeamInfoByContest(Long contestId, Character state) {
		QContestParticipants qContestParticipants = QContestParticipants.contestParticipants;
		QTeam qTeam = QTeam.team;

		// 조건적 쿼리 생성
		BooleanExpression whereClause = qContestParticipants.contest.id.eq(contestId);
		if (state != null && !state.equals('J')) {
			whereClause = whereClause.and(qContestParticipants.contestParticipantsState.eq('A'));
		}

		// 쿼리 실행
		return queryFactory
			.select(
				Projections.constructor(
					ContestTeamInfoDto.class,
					qTeam.id,
					qTeam.teamName,
					qContestParticipants.contestParticipantsState,
					qContestParticipants.isParticipants,
					qContestParticipants.contestParticipantsReason
				)
			)
			.from(qContestParticipants)
			.join(qContestParticipants.team, qTeam)
			.where(whereClause)
			.fetch();
	}

}
