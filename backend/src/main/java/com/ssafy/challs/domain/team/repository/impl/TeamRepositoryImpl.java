package com.ssafy.challs.domain.team.repository.impl;

import static com.ssafy.challs.domain.team.entity.QTeam.*;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.challs.domain.team.repository.TeamRepositoryCustom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public void updateImage(String imageUrl, Long teamId) {
		queryFactory
			.update(team)
			.set(team.teamImage, imageUrl)
			.where(team.id.eq(teamId))
			.execute();
	}

}
