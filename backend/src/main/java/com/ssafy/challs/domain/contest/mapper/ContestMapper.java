package com.ssafy.challs.domain.contest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import com.ssafy.challs.domain.contest.dto.ContestTeamInfoDto;
import com.ssafy.challs.domain.contest.dto.request.ContestCreateRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestParticipantRequestDto;
import com.ssafy.challs.domain.contest.dto.request.ContestUpdateRequestDto;
import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestSearchResponseDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamMemberInfoDto;
import com.ssafy.challs.domain.contest.dto.response.ContestTeamResponseDto;
import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.contest.entity.ContestParticipants;
import com.ssafy.challs.domain.team.entity.Team;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContestMapper {

	@Mapping(source = "team", target = "team")
	@Mapping(source = "contestRequestDto.registrationPeriod.start", target = "contestRegistrationStart")
	@Mapping(source = "contestRequestDto.registrationPeriod.end", target = "contestRegistrationEnd")
	@Mapping(source = "contestRequestDto.contestPeriod.start", target = "contestStart")
	@Mapping(source = "contestRequestDto.contestPeriod.end", target = "contestEnd")
	Contest contestCreateDtoToContest(ContestCreateRequestDto contestRequestDto, Team team, Character contestState);

	@Mapping(source = "contest", target = "contest")
	@Mapping(target = "id", ignore = true)
	Awards awardsDtoToEntity(ContestAwardsDto contestAwardsDto, Contest contest);

	@Mapping(source = "contestRequestDto.contestId", target = "id")
	@Mapping(source = "team", target = "team")
	@Mapping(source = "contestRequestDto.registrationPeriod.start", target = "contestRegistrationStart")
	@Mapping(source = "contestRequestDto.registrationPeriod.end", target = "contestRegistrationEnd")
	@Mapping(source = "contestRequestDto.contestPeriod.start", target = "contestStart")
	@Mapping(source = "contestRequestDto.contestPeriod.end", target = "contestEnd")
	Contest contestUpdateDtoToContest(ContestUpdateRequestDto contestRequestDto, Team team, Character contestState);

	default Page<ContestSearchResponseDto> contestPageToDtoPage(Page<Contest> contestPage) {
		return contestPage.map(this::contestToSearchResponseDto);
	}

	@Mapping(source = "contest.team.teamName", target = "teamName")
	@Mapping(source = "contestRegistrationStart", target = "registrationPeriod.start")
	@Mapping(source = "contestRegistrationEnd", target = "registrationPeriod.end")
	@Mapping(source = "contestStart", target = "contestPeriod.start")
	@Mapping(source = "contestEnd", target = "contestPeriod.end")
	ContestSearchResponseDto contestToSearchResponseDto(Contest contest);

	@Mapping(source = "contest.team.id", target = "teamId")
	@Mapping(source = "contest.team.teamName", target = "teamName")
	@Mapping(source = "contest.contestRegistrationStart", target = "registrationPeriod.start")
	@Mapping(source = "contest.contestRegistrationEnd", target = "registrationPeriod.end")
	@Mapping(source = "contest.contestStart", target = "contestPeriod.start")
	@Mapping(source = "contest.contestEnd", target = "contestPeriod.end")
	ContestFindResponseDto contestToFindResponseDto(Contest contest, List<Awards> contestAwards,
		Boolean isLeader, Character participantState);

	List<ContestAwardsDto> awardsToDtoList(List<Awards> awardsList);

	ContestAwardsDto awardsToDto(Awards awards);

	@Mapping(target = "id", ignore = true)
	@Mapping(source = "contest", target = "contest")
	@Mapping(source = "team", target = "team")
	@Mapping(target = "contestParticipantsState", expression = "java(Character.valueOf('W'))")  // 'W'로 설정
	@Mapping(target = "isParticipants", constant = "false")
		// 항상 false로 설정
	ContestParticipants contestParticipantsDtoToEntity(ContestParticipantRequestDto participantRequestDto,
		Contest contest, Team team);

	ContestTeamResponseDto entityToContestTeamResponseDto(ContestTeamInfoDto contestTeamInfoDto,
		List<ContestTeamMemberInfoDto> teamMembers, List<ContestAwardsDto> awards);

}
