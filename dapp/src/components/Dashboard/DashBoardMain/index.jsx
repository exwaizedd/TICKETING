import React from 'react';
import styles from './dashBoardMain.module.scss';
import { images } from '../../../utils/images';
import TicketType from '../TicketType';

const DashBoardMain = () => {
  return (
    <section className={styles.dashBoard}>
      <div className={styles.dashBoard__textContainer}>
        <div className={styles.text}>
          <p>Decentralized Ticketing</p>
          <h2>
            A Decentralized Ticketing Solution using Blockchain Technology.
          </h2>
        </div>
      </div>
      <div className={styles.dashBoard__imgContainer}>
        <img src={images.webTicketImg} alt='web-ticket-img' />
      </div>
      <TicketType />
    </section>
  );
};

export default DashBoardMain;
