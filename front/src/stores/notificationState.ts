import { atom } from 'recoil'

export const notificationState = atom<boolean>({
  key: 'notificationState',
  default: false,
})
