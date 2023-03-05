import React, { useState } from 'react';
import { images } from '../../utils/images';
import { useContract, useContractEvents } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';
import styles from './ticket.module.scss';
import {
  convertFromUnix,
  convertToIntegar,
  incrementIndex,
  decreaseIndex,
} from '../../utils/utils';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';

const contractAddress = '0x89ae7403e2D38426949185D0399346a335c5d91c';

const Ticket = () => {
  const [index, setIndex] = useState(0);
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const { data: event, isLoading } = useContractEvents(
    contract,
    'TicketCreated',
    {
      filters: {
        owner: address,
      },
    }
  );

  if (isLoading || event === undefined) {
    return (
      <section className={styles.ticketContainer}>
        <p className={styles.ticketContainer__loadingText}>
          Please wait a moment <br />
          retrieveing your tickets...
        </p>
      </section>
    );
  }

  const tickets = event.filter((ticket) => ticket.data.owner !== address);
  let ticket = tickets[index];

  const weiValue = ethers.BigNumber.from(
    `${convertToIntegar(ticket.data.amount._hex)}`
  );
  const etherValue = ethers.utils.formatEther(weiValue);

  const handleIncreaseIndex = () => {};

  return (
    <section className={styles.ticketContainer}>
      <div className={styles.barCodeContainer}>
        <motion.img
          src={images.chevronRight}
          alt='circleCheron_left'
          className={styles.barCodeContainer__circleChevronLeft}
          whileTap={{ scale: 0.8 }}
          onClick={() => setIndex(incrementIndex(index, tickets.length - 1))}
        />
        <motion.img
          src={images.chevronRight}
          alt='circleCheron_Right'
          className={styles.barCodeContainer__circleChevronRight}
          whileTap={{ scale: 0.8 }}
          onClick={() => setIndex(decreaseIndex(index, tickets.length - 1))}
        />
        <img src={images.QR} alt='Qr_Code_img' />
        <div className={styles.barCodeContainer__ticketAmount}>
          <div className={styles.infoContainer}>
            <p className={styles.infoTitle}>Sold for {`${etherValue} ETH`}</p>
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
            <p>{ticket.data.ticketType}</p>
          </div>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Ticket ID:</h3>
            <p>{convertToIntegar(ticket.data.ticketId._hex)}</p>
          </div>
          <div className={styles.ticketInfoContainer__ticketDetailsInfo}>
            <h3>Validity</h3>
            <p>{`${convertFromUnix(ticket.data.validUntil._hex)} Days`}</p>
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
