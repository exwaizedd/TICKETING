import React from 'react';
import { images } from '../../utils/images';
import styles from './ticket.module.scss';
import { motion } from 'framer-motion';

const Ticket = (props) => {
  return (
    <section className={styles.ticketContainer}>
      <div className={styles.barCodeContainer}>
        <motion.img
          src={images.chevronRight}
          alt='circleCheron_left'
          className={styles.barCodeContainer__circleChevronLeft}
          whileTap={{ scale: 0.8 }}
        />
        <motion.img
          src={images.chevronRight}
          alt='circleCheron_Right'
          className={styles.barCodeContainer__circleChevronRight}
          whileTap={{ scale: 0.8 }}
        />
        <img src={images.QR} alt='Qr_Code_img' />
        <div className={styles.barCodeContainer__ticketAmount}>
          <div className={styles.infoContainer}>
            <p className={styles.infoTitle}>Sold for {'$29.75'}</p>
            <p className={styles.infoText}>28 january 2023, 07:33GMT +1</p>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.infoTitle}>Used</p>
            <p className={styles.infoText}>Awaiting...</p>
          </div>
          <img src={images.nut1} alt='nut_icon' className={styles.nut1} />
          <img src={images.nut2} alt='nut_icon' className={styles.nut2} />
        </div>
      </div>

      <div className={styles.ticketInfoContainer}>
        <div className={styles.ticketInfoContainer__ticketDetailsTitle}>
          <img src={images.info} alt='info_icon' />
          <h2>Ticket Details</h2>
        </div>
        <div className={styles.ticketInfoContainer__ticketDetails}>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Ticket Type:</h3>
            <p>Voucher</p>
          </div>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Ticket ID:</h3>
            <p>1</p>
          </div>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Validity</h3>
            <p>1 Day</p>
          </div>
        </div>
        <div className={styles.ticketInfoContainer__ticketDetails}>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Status</h3>
            <p>Not Used</p>
          </div>
          <div
            className={`${styles.ticketInfoContainer__ticketDetailsInfo} ${styles.modifier}`}
          >
            <h3>ipfs CID:</h3>
            <p>0xabqw256bgdf56ggdfwy766e</p>
          </div>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}></div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
