import styles from './modal.styles.module.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
        <button className={styles.modalClose} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default Modal
