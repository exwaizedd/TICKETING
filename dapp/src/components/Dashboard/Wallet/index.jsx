import styles from './wallet.module.scss';
import { useBalance, useAddress } from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { images } from '../../../utils/images';

const Wallet = (props) => {
  const address = useAddress();
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  return (
    <section className={styles.wallet} onClick={props.onClick}>
      <header className={styles.wallet__header}>
        <img src={images.user} alt='userIcon' />{' '}
        <p>{address.substring(0, 20)}</p>
      </header>
      <footer className={styles.wallet__footer}>
        <p>Total Balance</p>
        <p>{isLoading ? 'loading...' : `${data.displayValue}${data.symbol}`}</p>
      </footer>
    </section>
  );
};

export default Wallet;
