package com.ssafy.challs.domain.qna.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.challs.domain.qna.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Long>, QnaRepositoryCustom {
}
