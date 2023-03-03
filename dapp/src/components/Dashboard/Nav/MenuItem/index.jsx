import React from 'react';
import styles from './menuItem.module.scss';
import { motion } from 'framer-motion';

const MenuItem = (props) => {
  return (
    <motion.li
      className={styles.menuItem}
      whileTap={{ scale: 0.8 }}
      onClick={props.onClick}
    >
      <img src={props.image} alt='home-icon' />
      {props.title}
    </motion.li>
  );
};

export default MenuItem;
