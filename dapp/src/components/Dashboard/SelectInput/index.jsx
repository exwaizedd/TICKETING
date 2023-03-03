import { useState } from 'react';
import styles from './selectInput.module.scss';
import { images } from '../../../../src/utils/images';

const SelectInput = (props) => {
  const [rotate, setRotate] = useState(false);

  return (
    <div className={styles.select}>
      <label htmlFor={props.name}> {props.label}</label>

      <div className={styles.select__selectContainer}>
        <select
          id={props.id}
          name={props.name}
          onChange={(e) => props.onChange(e)}
          onClick={() => setRotate(!rotate)}
        >
          <option value=''>{`select ${props.label}`}</option>
          {props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          {/* <option value='etherium'>etherium</option>
          <option value='bitcoin'>bitcoin</option>
          <option value='coinbase'>coinbase</option>
          <option value='my coin'>my coin</option> */}
        </select>
        <img
          src={images.chevronDown}
          alt='arrow-down icon'
          className={styles[rotate.toString()]}
        />
      </div>
    </div>
  );
};

export default SelectInput;
