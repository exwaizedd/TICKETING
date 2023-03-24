import React from 'react';
import { useContract, useContractEvents } from '@thirdweb-dev/react';
import styles from './successModal.module.scss';
import {
  convertToIntegar,
  convertUnixToTime,
  contractAddress,
} from '../../../utils/utils';
import { ethers } from 'ethers';

const SuccessModal = (props) => {
  const { contract } = useContract(contractAddress);
  const { data: event, isLoading } = useContractEvents(
    contract,
    'TicketCreated'
  );

  if (props.error) {
    return (
      <section
        className={styles.successModal}
        onClick={() => props.setOnError(false)}
      >
        <div className={styles.successModal__cardContainer}>
          <p className={styles.errorText}>Oops! something went wrong</p>
        </div>
      </section>
    );
  }

  if (isLoading || event === undefined) {
    return (
      <section className={styles.successModal}>
        <div className={styles.successModal__cardContainer}>
          <div className={styles.success_checkmark}>
            <div className={styles.check_icon}>
              <span className={`${styles.icon_line} ${styles.line_tip}`}></span>
              <span
                className={`${styles.icon_line} ${styles.line_long}`}
              ></span>
              <div className={styles.icon_circle}></div>
              <div className={styles.icon_fix}></div>
            </div>
          </div>
          <h3 className={styles.centerHeader}>Transaction Successful </h3>
          <p>Retrieving Ticket Info...</p>
        </div>
      </section>
    );
  }

  // const weiValue = ethers.BigNumber.from(
  //   `${convertToIntegar(event[0].data.amount._hex)}`
  // );
  // const etherValue = ethers.utils.formatEther(weiValue);

  if (!event || !event[0] || !event[0].data || !event[0].data.amount) {
    return (
      <section className={styles.successModal}>
        <div className={styles.successModal__cardContainer}>
          <p className={styles.errorText}>Error: Event data is missing.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.successModal}
      onClick={() => props.setOnSuccessful(false)}
    >
      <div
        className={styles.successModal__cardContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.success_checkmark}>
          <div className={styles.check_icon}>
            <span className={`${styles.icon_line} ${styles.line_tip}`}></span>
            <span className={`${styles.icon_line} ${styles.line_long}`}></span>
            <div className={styles.icon_circle}></div>
            <div className={styles.icon_fix}></div>
          </div>
        </div>
        <h3>Transaction Successful </h3>
        <div className={styles.infoContainer}>
          <p>
            Ticket Type : <span>{event[0].data.ticketType}</span>
          </p>
          <p>
            Ticket ID :{' '}
            <span>{convertToIntegar(event[0].data._ticketId._hex)}</span>
          </p>
          <p>
            Ticket amount :{' '}
            <span>{`${
              convertToIntegar(event[0].data.amount._hex) / Math.pow(10, 18)
            } ETH`}</span>
          </p>
          <p>
            Validity :{' '}
            <span>{`${convertUnixToTime(event[0].data.validUntil._hex)}`}</span>
          </p>
          <p>
            Ticket Hash :{' '}
            <span>
              {event[0].transaction.transactionHash.substring(0, 20)}...
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessModal;
