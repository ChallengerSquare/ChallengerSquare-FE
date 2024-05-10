import { atom } from 'recoil'

export const tapState = atom<string>({
  key: 'tapState',
  default: 'myInfo',
})
