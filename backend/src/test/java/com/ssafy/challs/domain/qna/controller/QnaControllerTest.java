package com.ssafy.challs.domain.qna.controller;

import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.challs.domain.WithCustomMockUser;
import com.ssafy.challs.domain.qna.dto.response.QnaResponseDto;
import com.ssafy.challs.domain.qna.service.QnaService;

@WebMvcTest(QnaController.class)
@MockBean(JpaMetamodelMappingContext.class)
class QnaControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	QnaService qnaService;

	private ObjectMapper objectMapper;

	@Test
	@DisplayName("대회 조회")
	@WithCustomMockUser
	void searchQnaList() throws Exception {
		// Given
		QnaResponseDto qna1 = QnaResponseDto.builder().qnaId(1L).title("질문1").build();
		QnaResponseDto qna2 = QnaResponseDto.builder().qnaId(2L).title("질문2").build();
		List<QnaResponseDto> qnaResponseDtoList = List.of(qna1, qna2);
		PageImpl<QnaResponseDto> response = (PageImpl<QnaResponseDto>)new PageImpl<>(qnaResponseDtoList);

		given(qnaService.searchQna(1L, PageRequest.of(0, 10))).willReturn(response);

		// When
		ResultActions result = mockMvc.perform(get("/qna/" + 1)
			.with(csrf())
			.accept(MediaType.APPLICATION_JSON));

		// Then
		result.andExpect(status().isOk())
			.andExpect(jsonPath("$.data.size").value(2))
			.andExpect(jsonPath("$.data.content[0].qnaId").value(1))
			.andExpect(jsonPath("$.data.content[1].qnaId").value(2));

	}

}