package com.ssafy.challs.domain.contest.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import com.ssafy.challs.domain.contest.dto.response.ContestAwardsDto;
import com.ssafy.challs.domain.contest.dto.response.ContestFindResponseDto;
import com.ssafy.challs.domain.contest.entity.Awards;
import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.team.entity.Team;

class ContestMapperTest {
	private ContestMapper mapper = Mappers.getMapper(ContestMapper.class);

	@Test
	void testContestToFindResponseDto() {
		// Mock data
		Team team = Team.builder().teamName("팀이름").build();
		Contest contest = Contest.builder().contestTitle("대회 이름").team(team).build();

		List<Awards> awardsList = Arrays.asList(
			Awards.builder().id(1L).awardsName("최우수").awardsCount(1).awardsPrize(1000).build(),
			Awards.builder().id(2L).awardsName("우수").awardsCount(3).awardsPrize(500).build());

		// Map to DTO
		ContestFindResponseDto dto = mapper.contestToFindResponseDto(contest, awardsList, true, 'A');

		// Assertions
		System.out.println(dto.contestAwards());
		assertEquals("대회 이름", dto.contestTitle());
		assertEquals("팀이름", dto.teamName());
		assertEquals(2, dto.contestAwards().size());
	}

	@Test
	void testAwardsToDtoList() {
		// Mock data
		List<Awards> awardsList = Arrays.asList(
			Awards.builder().id(1L).awardsName("최우수").awardsCount(1).awardsPrize(1000).build(),
			Awards.builder().id(2L).awardsName("우수").awardsCount(3).awardsPrize(500).build());

		// Map to DTO list
		List<ContestAwardsDto> dtos = mapper.awardsToDtoList(awardsList);

		// Assertions
		assertEquals(2, dtos.size());
		assertEquals("최우수", dtos.get(0).awardsName());
		assertEquals("우수", dtos.get(1).awardsName());
	}
}
