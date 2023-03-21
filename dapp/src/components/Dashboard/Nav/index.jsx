import { useState } from 'react';
import styles from './nav.module.scss';
import { useAddress } from '@thirdweb-dev/react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../../utils/images';
import { motion } from 'framer-motion';
import DropDownMenu from './DropDownMenu';
import Wallet from '../Wallet';

const Nav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const address = useAddress();
  const navigate = useNavigate();
  const adminAccess = process.env.ACCESS_VALUE;

  const handleNavigate = () => {
    navigate('/dashboard/ticket');
    setShowLinks(false);
  };

  const handleHomeNavigate = () => {
    navigate('/dashboard');
    setShowLinks(false);
  };

  const handleshowWallet = () => {
    setShowLinks(false);
    setShowWallet(!showWallet);
  };
  const handleshowLinks = () => {
    setShowWallet(false);
    setShowLinks(!showLinks);
  };
  return (
    <header className={styles.homeNav}>
      <nav className={styles.homeNav__nav}>
        <ul>
          <motion.li whileTap={{ scale: 0.8 }}>
            <Link to='/dashboard'>Dashboard</Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.8 }}>
            <Link to='/about'>About Us</Link>
          </motion.li>
          {address.toString() === adminAccess && (
            <motion.li whileTap={{ scale: 0.8 }}>
              <Link to='/admin'>Admin</Link>
            </motion.li>
          )}
        </ul>
      </nav>
      <div className={styles.homeNav__iconContainer}>
        <motion.button whileTap={{ scale: 0.85 }}>
          <Link to='ticket' className={styles.link}>
            <img src={images.ticket} alt='ticket-icon' />
          </Link>
        </motion.button>

        <motion.button whileTap={{ scale: 0.85 }} onClick={handleshowWallet}>
          <img src={images.wallet} alt='wallet-icon' />
        </motion.button>
        <motion.button whileTap={{ scale: 0.85 }}>
          <Link to='profile'>
            {' '}
            <img src={images.user} alt='user-icon' />
            <p>{`${address.substring(0, 4)}....${address.substring(
              address.length - 2
            )}`}</p>
          </Link>
        </motion.button>
      </div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        className={styles.menuBtn}
        onClick={handleshowLinks}
      >
        <span
          className={
            showLinks
              ? `${styles.menuBtn__burger} ${styles.open}`
              : `${styles.menuBtn__burger}`
          }
        ></span>
      </motion.div>
      {showLinks && (
        <DropDownMenu
          handleshowWallet={() => handleshowWallet()}
          handleNavigate={() => handleNavigate()}
          handleHomeNavigate={() => handleHomeNavigate()}
        />
      )}
      {showWallet && <Wallet onClick={() => setShowWallet(false)} />}
    </header>
  );
};

export default Nav;
