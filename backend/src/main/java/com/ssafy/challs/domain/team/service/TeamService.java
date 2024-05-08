package com.ssafy.challs.domain.team.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.challs.domain.team.dto.request.TeamCodeRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamCreateRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamParticipantsRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateLeaderRequestDto;
import com.ssafy.challs.domain.team.dto.request.TeamUpdateRequestDto;
import com.ssafy.challs.domain.team.dto.response.TeamContestResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamCreateResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamInfoResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamMemberResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamParticipantsResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamPublicResponseDto;
import com.ssafy.challs.domain.team.dto.response.TeamResponseDto;

public interface TeamService {

	TeamCreateResponseDto createTeam(TeamCreateRequestDto teamRequestDto, Long memberId, MultipartFile teamImage);

	TeamCreateResponseDto updateTeam(TeamUpdateRequestDto teamRequestDto, MultipartFile teamImage,
		Long memberId);

	TeamInfoResponseDto findTeamInfo(String teamCode, Long memberId);

	void createParticipants(TeamCodeRequestDto teamCodeRequestDto, Long memberId);

	void updateParticipants(TeamParticipantsRequestDto teamParticipantsRequestDto, Long memberId);

	List<TeamParticipantsResponseDto> searchTeamParticipantList(Long teamId, Long memberId);

	List<TeamMemberResponseDto> searchTeamMemberList(Long teamId);

	TeamResponseDto findTeam(Long teamId, Long memberId);

	TeamPublicResponseDto findTeamPublic(Long teamId);

	void deleteTeam(Long teamId, Long memberId);

	void deleteParticipants(Long teamId, Long memberId);

	void updateTeamLeader(TeamUpdateLeaderRequestDto teamUpdateLeaderRequestDto, Long memberId);

	Page<TeamContestResponseDto> searchTeamContestList(Long teamId, Pageable pageable);
}
