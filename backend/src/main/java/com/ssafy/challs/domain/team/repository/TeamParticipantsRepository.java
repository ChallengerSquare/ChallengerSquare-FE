package com.ssafy.challs.domain.team.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.challs.domain.member.entity.Member;
import com.ssafy.challs.domain.team.entity.Team;
import com.ssafy.challs.domain.team.entity.TeamParticipants;

@Repository
public interface TeamParticipantsRepository extends JpaRepository<TeamParticipants, Long> {

	// 멤버와 팀을 넘겨줘서 해당 멤버가 해당 팀의 리더인지 확인
	boolean existsByMemberAndTeamAndIsLeaderTrue(Member member, Team team);

}
