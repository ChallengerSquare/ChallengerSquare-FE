import { ButtonHTMLAttributes } from 'react'

import style from '@/components/Button/Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'white' | 'purple' // 'purple' 버리언트 추가
  children: React.ReactNode
}

const Button = ({ variant = 'default', children, type, ...props }: ButtonProps) => {
  const buttonType = type || 'button'
  const className = variant === 'white' ? style.white : variant === 'purple' ? style.purple : style.default
  return (
    <button className={className} type={buttonType} {...props}>
      {children}
    </button>
  )
}
export default Button
