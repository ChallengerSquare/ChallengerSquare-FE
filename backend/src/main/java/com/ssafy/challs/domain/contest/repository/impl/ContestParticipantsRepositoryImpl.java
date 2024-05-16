package com.ssafy.challs.domain.contest.repository.impl;

import static com.ssafy.challs.domain.contest.entity.QContestParticipants.*;
import static com.ssafy.challs.domain.team.entity.QTeam.*;
import static com.ssafy.challs.domain.team.entity.QTeamParticipants.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.contest.dto.ContestParticipantsInfoDto;
import com.ssafy.challs.domain.contest.dto.ContestParticipantsLeaderStateDto;
import com.ssafy.challs.domain.contest.dto.ContestTeamInfoDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamMemberInfoDto;
import com.ssafy.challs.domain.contest.entity.ContestParticipants;
import com.ssafy.challs.domain.contest.entity.QContestParticipants;
import com.ssafy.challs.domain.contest.repository.ContestParticipantsRepositoryCustom;
import com.ssafy.challs.domain.member.entity.QMember;
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
		QContestParticipants qContestParticipants = contestParticipants;
		QTeam qTeam = team;

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

	@Override
	public List<ContestTeamMemberInfoDto> searchTeamMemberByTeamId(Long teamId) {
		QTeamParticipants qTeamParticipants = teamParticipants;
		QMember qMember = QMember.member;

		// 쿼리 실행
		return queryFactory
			.select(
				Projections.constructor(
					ContestTeamMemberInfoDto.class,
					qMember.memberName,
					qMember.memberBirth,
					qMember.memberPhone,
					qMember.memberAddress,
					qTeamParticipants.isLeader
				)
			)
			.from(qTeamParticipants)
			.join(qTeamParticipants.member, qMember)
			.where(qTeamParticipants.team.id.eq(teamId))
			.orderBy(qTeamParticipants.isLeader.desc())
			.fetch();
	}

	@Override
	public void updateContestParticipantsState(Long contestId, List<Long> agreeMembers) {
		QContestParticipants qContestParticipants = contestParticipants;

		queryFactory.update(qContestParticipants)
			.set(qContestParticipants.contestParticipantsState,
				new CaseBuilder()
					.when(qContestParticipants.id.in(agreeMembers))
					.then('A')
					.otherwise('R')
			)
			.where(qContestParticipants.contest.id.eq(contestId))
			.execute();
	}

	@Override
	public List<ContestParticipantsInfoDto> findAllTeamFromContestId(Long contestId) {
		QContestParticipants qContestParticipants = contestParticipants;

		// 쿼리 실행
		return queryFactory
			.select(
				Projections.constructor(
					ContestParticipantsInfoDto.class,
					qContestParticipants.team.id,
					qContestParticipants.contestParticipantsState
				)
			)
			.from(qContestParticipants)
			.where(qContestParticipants.contest.id.eq(contestId))
			.fetch();
	}

	@Override
	public List<Long> searchMemberIdFromTeamId(Long teamId) {
		QTeamParticipants qTeamParticipants = teamParticipants;

		return queryFactory
			.select(qTeamParticipants.member.id)
			.from(qTeamParticipants)
			.where(qTeamParticipants.team.id.eq(teamId))
			.fetch();
	}

	@Override
	public ContestParticipantsLeaderStateDto isLeaderAndParticipantsState(Long contestId, Long memberId) {
		QTeamParticipants qTeamParticipants = teamParticipants;
		QContestParticipants qContestParticipants = contestParticipants;

		// 하나의 쿼리로 리더 여부와 대회 참여 상태 가져오기
		return queryFactory
			.select(
				Projections.constructor(
					ContestParticipantsLeaderStateDto.class,
					qTeamParticipants.isLeader, qContestParticipants.contestParticipantsState
				)
			)
			.from(qTeamParticipants)
			.join(qTeamParticipants.team, qContestParticipants.team)
			.where(qContestParticipants.contest.id.eq(contestId)
				.and(qTeamParticipants.member.id.eq(memberId)))
			.fetchOne();
	}

	@Override
	public void updateContestIsParticipants(Long contestId, List<Long> participantsTeams) {
		QContestParticipants qContestParticipants = contestParticipants;

		queryFactory.update(qContestParticipants)
			.set(qContestParticipants.isParticipants, true)
			.where(qContestParticipants.contest.id.eq(contestId),
				qContestParticipants.team.id.in(participantsTeams))
			.execute();
	}

	@Override
	public List<Long> searchMemberIdListFromContestId(Long contestId) {
		List<Long> teamIdList = queryFactory.select(contestParticipants.team.id)
			.from(contestParticipants)
			.where(contestParticipants.contest.id.eq(contestId)).fetch();
		return queryFactory.select(teamParticipants.member.id)
			.from(teamParticipants)
			.where(teamParticipants.team.id.in(teamIdList))
			.fetch();
	}

}
