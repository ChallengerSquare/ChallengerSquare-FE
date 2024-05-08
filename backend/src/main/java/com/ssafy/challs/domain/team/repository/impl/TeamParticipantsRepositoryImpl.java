package com.ssafy.challs.domain.team.repository.impl;

import static com.ssafy.challs.domain.team.entity.QTeamParticipants.*;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
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

}
