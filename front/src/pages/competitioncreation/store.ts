import { CreateCompetitionDto } from '@/types/api'
import { atom } from 'recoil'

export interface CreateCompetitionButtonState {
  offLine: string
  free: boolean
}

export const competitionForm = atom<CreateCompetitionDto>({
  key: 'competitionForm',
  default: {
    contestImage: '',
    contestCreateRequestDto: {
      contestTitle: '',
      contestContent: '',
      contestLocation: '',
      teamId: 0,
      registrationPeriod: {
        start: '',
        end: '',
      },
      contestPeriod: {
        start: '',
        end: '',
      },
      contestRegistrationNum: 0, // 대회 모집인원
      contestFee: 0,
      contestPhone: '',
      isPriority: false,
      contestCategory: '',
      contestPeopleMin: 0,
      contestPeopleMax: 0,
      contestAwards: [
        {
          awardsName: '',
          awardsCount: 0,
          awardsPrize: 0,
        },
      ],
    },
  },
})

export const formButtonState = atom<CreateCompetitionButtonState>({
  key: 'createCompetitionButtonState',
  default: {
    offLine: '',
    free: false,
  },
})
