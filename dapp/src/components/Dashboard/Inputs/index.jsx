import React from 'react';
import styles from './input.module.scss';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.label} className={styles.inputContainer__label}>
        {props.label}
      </label>
      <input {...props} className={styles.inputContainer__input} />
    </div>
  );
};

export default Input;
