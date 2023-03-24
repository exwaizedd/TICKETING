import React from 'react';
import MenuItem from '../MenuItem';
import { useDisconnect } from '@thirdweb-dev/react';
import { images } from '../../../../utils/images';
import styles from './dropDownMenu.module.scss';

const DropDownMenu = (props) => {
  const disconnect = useDisconnect();

  return (
    <section className={styles.DropDownMenu}>
      <ul className={styles.DropDownMenu__listContainer}>
        <MenuItem
          image={images.home}
          title='home'
          onClick={props.handleHomeNavigate}
        />
        <MenuItem
          image={images.user}
          title='profile'
          onClick={props.handleProfileNavigate}
        />
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
