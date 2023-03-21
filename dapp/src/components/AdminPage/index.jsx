import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddress, useBalance, useDisconnect } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import styles from './admin.module.scss';
import { images } from '../../utils/images';
import TransactionTable from './Table';
import AdminBody from './AdminContent';
import { motion } from 'framer-motion';

const Admin = () => {
  const address = useAddress();
  // get ticket balance
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const disconnect = useDisconnect();
  const navigate = useNavigate();
  const handleDisconnect = () => {
    navigate('/');
    disconnect();
  };

  return (
    <section className={styles.adminSection}>
      <div className={styles.adminAccessContainer}>
        <div className={styles.adminAccessContainer__linksContainer}>
          <Link to='/dashboard' className={styles.link}>
            DashBoard
          </Link>
          <motion.button
            className={styles.button}
            whileTap={{ scale: 0.7 }}
            onClick={handleDisconnect}
          >
            LogOut
          </motion.button>
        </div>
        <div className={styles.adminAccessContainer__AdminInfoContainer}>
          <p>
            {isLoading
              ? 'Getting wallet balance...'
              : `${data.displayValue}${data.symbol}`}
          </p>
          <p className={styles.text_twitter}>
            {`${address.substring(0, 4)}...${address.substring(
              address.length - 3
            )}`}{' '}
            <img src={images.twitterBadge} alt='twitter_badge' />
          </p>
          <p className={styles.adminText}>Administrative Access</p>
        </div>
      </div>
      <AdminBody />
      <TransactionTable />
    </section>
  );
};

export default Admin;
