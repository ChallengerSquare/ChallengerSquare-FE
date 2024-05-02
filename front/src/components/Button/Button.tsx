import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: 'purple' | 'white'
  onClick?: () => void
  // size: "login" | ;
  children: React.ReactNode
}

const Button = ({ variation, onClick, children, type = 'button', ...props }: ButtonProps) => {
  const className = variation === 'white' ? styles.white : styles.purple
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
