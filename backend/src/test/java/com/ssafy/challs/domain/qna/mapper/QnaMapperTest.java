package com.ssafy.challs.domain.qna.mapper;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.entity.Qna;

class QnaMapperTest {
	private QnaMapper mapper = Mappers.getMapper(QnaMapper.class);

	@Test
	public void testQnaCreateRequestDtoToQna() {
		QnaCreateRequestDto dto = new QnaCreateRequestDto("제목입니다", "내용입니다", 1L);
		Contest contest = Contest.builder().id(1L).build();
		Long memberId = 123L;

		Qna qna = mapper.qnaCreateRequestDtoToQna(dto, contest, memberId);

		assertEquals("제목입니다", qna.getQnaTitle());
		assertEquals("내용입니다", qna.getQnaContent());
		assertEquals(1L, qna.getContest().getId());
		assertEquals(123L, qna.getMemberId());
	}

}