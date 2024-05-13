import { atom } from 'recoil'

export const tapState = atom<string>({
  key: 'tapState',
  default: 'myInfo',
})

export const teamTapState = atom<boolean>({
  key: 'teamState',
  default: false,
})

export const teamDetailTapState = atom<boolean>({
  key: 'teamDetailTapState',
  default: false,
})

export const teamIdxState = atom<number>({
  key: 'teamIdxState',
  default: 0,
})
