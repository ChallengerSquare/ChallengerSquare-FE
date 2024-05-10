package com.ssafy.challs.domain.qna.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.qna.dto.request.QnaCreateRequestDto;
import com.ssafy.challs.domain.qna.entity.Qna;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QnaMapper {

	@Mapping(source = "contest", target = "contest")
	Qna qnaCreateRequestDtoToQna(QnaCreateRequestDto qnaCreateRequestDto, Contest contest, Long memberId);

}
