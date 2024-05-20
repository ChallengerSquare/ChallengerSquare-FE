import styles from './Button.module.scss'

interface ButtonProps {
  variation: string
  onClick?: () => void
  // size: "login" | ;
  children: React.ReactNode
  disabled?: boolean
  width?: number
}

const Button = ({ variation, onClick, children, disabled, width, ...props }: ButtonProps) => {
  const className = variation
    .split(' ')
    .map((v) => styles[v])
    .join(' ')

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} onClick={onClick} style={{ width }} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
