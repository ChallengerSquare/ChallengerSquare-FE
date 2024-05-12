package com.ssafy.challs.domain.team.repository.impl;

import static com.ssafy.challs.domain.team.entity.QTeamParticipants.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.member.dto.response.MemberTeamLeaderResponseDto;
import com.ssafy.challs.domain.team.repository.TeamParticipantsRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TeamParticipantsRepositoryImpl implements TeamParticipantsRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public void updateParticipants(Long participantId) {
		queryFactory.update(teamParticipants)
			.set(teamParticipants.isParticipants, true)
			.where(teamParticipants.id.eq(participantId))
			.execute();
	}

	@Override
	public void updateLeader(Long participantId, boolean isLeader) {
		queryFactory.update(teamParticipants)
			.set(teamParticipants.isLeader, isLeader)
			.where(teamParticipants.id.eq(participantId))
			.execute();
	}

	// 멤버가 팀장인 팀 목록 조회
	@Override
	public List<MemberTeamLeaderResponseDto> searchTeamLeaderList(Long memberId) {
		return queryFactory.select(Projections.constructor(MemberTeamLeaderResponseDto.class, teamParticipants.team.id,
				teamParticipants.team.teamName))
			.from(teamParticipants)
			.where(teamParticipants.member.id.eq(memberId).and(teamParticipants.isLeader.isTrue()))
			.fetch();
	}

}
