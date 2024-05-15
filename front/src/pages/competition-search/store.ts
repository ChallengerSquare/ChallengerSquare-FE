import { atom } from 'recoil'
import { SearchRequest } from '@/types/api'

export const searchState = atom<SearchRequest>({
  key: 'searchState',
  default: {
    keyword: '',
    orderBy: 3,
    category: 0,
    isEnd: true,
  },
})

/*
1 : 모집마감임박
2 : 인기순 (신청자순)
3 : 최신순 (default)
4 : 이름순
*/
