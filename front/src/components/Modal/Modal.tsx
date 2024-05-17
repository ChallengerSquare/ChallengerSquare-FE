import React from 'react'
import styles from './Modal.module.scss'
/* eslint-disable jsx-a11y/no-static-element-interactions */

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  width?: number
  background?: boolean
}

const Modal = ({ isOpen, onClose, children, width, background = false }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={background ? styles['modal-overlay-white'] : styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} style={{ width }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
