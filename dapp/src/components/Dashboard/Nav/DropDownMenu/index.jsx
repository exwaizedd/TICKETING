import React from 'react';
import MenuItem from '../MenuItem';
import { useDisconnect, Web3Button } from '@thirdweb-dev/react';
// import ThirdWeb from '@thirdweb/thirdweb';
import { images } from '../../../../utils/images';
import styles from './dropDownMenu.module.scss';

const DropDownMenu = (props) => {
  const disconnect = useDisconnect();
  // const thirdweb = ThirdWeb.create({ network: 'mainnet' });

  // async function handleLogout() {
  //   const accounts = await thirdweb.getAccounts();
  //   await thirdweb.forget(accounts);
  //   setIsLoggedOut(true);
  // }

  return (
    <section className={styles.DropDownMenu}>
      <ul className={styles.DropDownMenu__listContainer}>
        <MenuItem
          image={images.home}
          title='home'
          onClick={props.handleHomeNavigate}
        />
        <MenuItem image={images.user} title='profile' />
        <MenuItem
          image={images.ticket}
          title='ticket'
          onClick={props.handleNavigate}
        />
        <MenuItem
          image={images.wallet}
          title='wallet'
          onClick={props.handleshowWallet}
        />
        <MenuItem image={images.logOut} title='logOut' onClick={disconnect} />
      </ul>
    </section>
  );
};

export default DropDownMenu;
