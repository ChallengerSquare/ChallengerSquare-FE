package com.ssafy.challs.domain.alert.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.alert.entity.AlertMember;

public interface AlertMemberRepository extends JpaRepository<AlertMember, Long> {

	List<AlertMember> findAllByMemberCode(String memberCode);

	List<AlertMember> findAllByMemberCodeAndIsRead(String memberCode, Boolean isRead);

}
