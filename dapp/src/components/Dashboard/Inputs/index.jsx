import React from 'react';
import styles from './input.module.scss';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.label} className={styles.inputContainer__label}>
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={styles.inputContainer__input}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default Input;
