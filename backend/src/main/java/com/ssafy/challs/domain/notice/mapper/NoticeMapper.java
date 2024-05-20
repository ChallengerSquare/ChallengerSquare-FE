package com.ssafy.challs.domain.notice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.ssafy.challs.domain.contest.entity.Contest;
import com.ssafy.challs.domain.notice.dto.request.NoticeCreateRequestDto;
import com.ssafy.challs.domain.notice.entity.Notice;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NoticeMapper {

	@Mapping(target = "id", ignore = true)
	@Mapping(source = "contest", target = "contest")
	@Mapping(source = "noticeCreateRequestDto.title", target = "noticeTitle")
	@Mapping(source = "noticeCreateRequestDto.content", target = "noticeContent")
	Notice noticeCreateRequestDtoToNotice(NoticeCreateRequestDto noticeCreateRequestDto, Contest contest);

}
