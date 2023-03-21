import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ onClick, children }) => {
  return (
    <section className={styles.modalContainer} onClick={onClick}>
      {children}
    </section>
  );
};

export default Modal;
