import { atom } from 'recoil'
import { User } from '@/types/user'

export const userForm = atom<User>({
  key: 'userForm',
  default: {
    username: '',
    birth: '',
    contact: '',
    address: '',
  },
})
