package com.ssafy.challs.domain.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.notice.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>, NoticeRepositoryCustom {
}
