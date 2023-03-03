import styles from './home.module.scss';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const address = useAddress();

  return address ? (
    <Navigate to='/dashboard' />
  ) : (
    <section className={styles.home}>
      <ConnectWallet
        accentColor='rgb(23, 88, 73)'
        colorMode='dark'
        btnTitle='Connect Wallet'
        className={styles.home__connectButton}
      />
    </section>
  );
};

export default Home;
