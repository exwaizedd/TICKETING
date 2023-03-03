import React from 'react';
import styles from './homeNav.module.scss';
import { Link } from 'react-router-dom';
import { images } from '../../../utils/images';
import { motion } from 'framer-motion';

const HomeNav = () => {
  return (
    <header className={styles.homeNav}>
      <nav className={styles.homeNav__nav}>
        <ul>
          <motion.li whileTap={{ scale: 0.8 }}>
            <Link to='/'>home</Link>
          </motion.li>
          <motion.li whileTap={{ scale: 0.8 }}>
            <Link to='/about'>About Us</Link>
          </motion.li>
        </ul>
      </nav>
      <div className={styles.homeNav__iconContainer}>
        <motion.button whileTap={{ scale: 0.85 }}>
          <img src={images.ticket} alt='ticket-icon' />
        </motion.button>
        <motion.button whileTap={{ scale: 0.85 }}>
          <img src={images.wallet} alt='wallet-icon' />
        </motion.button>
        <motion.button whileTap={{ scale: 0.85 }}>
          <img src={images.user} alt='user-icon' />
        </motion.button>
      </div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        className={styles.menuBtn}
        // onClick={() => setShowLinks(!showLinks)}
      >
        <span
          className={
            `${styles.menuBtn__burger}`
            // showLinks
            //   ? `${styles.menuBtn__burger} ${styles.open}`
            //   : `${styles.menuBtn__burger}`
          }
        ></span>
      </motion.div>
    </header>
  );
};

export default HomeNav;
