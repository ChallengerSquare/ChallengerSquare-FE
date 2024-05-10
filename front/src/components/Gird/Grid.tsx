import styles from './Grid.module.scss'

interface GridProps {
  grid: string
  children: React.ReactNode
}

const Grid = ({ grid, children }: GridProps) => {
  const className = `${styles[grid]}`
  return <div className={className}>{children}</div>
}
export default Grid
