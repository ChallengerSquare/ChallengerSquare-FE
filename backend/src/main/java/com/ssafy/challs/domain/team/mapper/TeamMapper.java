package com.ssafy.challs.domain.team.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;
import com.ssafy.challs.domain.team.entity.Team;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeamMapper {
	@Mapping(source = "image", target = "teamImage")
	Team teamCreateDtoToTeam(TeamCreateRequestDto teamCreateDto, String teamCode, String image, String teamPhone);

	@Mapping(source = "team.id", target = "teamId")
	@Mapping(source = "teamCode", target = "teamCode")
	@Mapping(source = "teamImage", target = "teamImage")
	TeamResponseDto teamToTeamResponseDto(Team team, Boolean isLeader, String teamCode, String teamImage);

	TeamParticipantsResponseDto teamParticipantsToTeamParticipantsResponseDto(Long participantsId, Member member,
		Boolean isApprove);

}
