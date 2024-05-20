package com.ssafy.challs.domain.team.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.entity.TeamParticipants;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeamParticipantsMapper {

	@Mapping(target = "id", ignore = true)
	TeamParticipants teamCodeRequestDtoToTeamParticipants(Team team, Member member, Boolean isLeader,
		Boolean isParticipants);
}
