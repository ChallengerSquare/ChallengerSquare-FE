package com.ssafy.challs.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.member.entity.AwardCode;

public interface AwardsCodeRepository extends JpaRepository<AwardCode, Long>, AwardsCodeRepositoryCustom {
}
