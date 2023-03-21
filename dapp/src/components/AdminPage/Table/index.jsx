import React from 'react';
import { images } from '../../../utils/images';
import { useContractEvents, useContract } from '@thirdweb-dev/react';
import { contractAddress, convertToIntegar } from '../../../utils/utils';
import styles from './transactionTable.module.scss';

const TransactionTable = () => {
  const { contract } = useContract(contractAddress);
  const { data: event, isLoading } = useContractEvents(contract, 'TicketUsed');

  if (isLoading) {
    return (
      <article className={styles.tableSection}>
        <div className={styles.titleContainer}>
          <img src={images.info} alt='user_icon' />
          <h2>Transactions</h2>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Ticket Type</th>
              <th>Amount</th>
              <th className={styles.address}>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='5' className={styles.infoRow}>
                Retrieving tickets...
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    );
  }

  if (event.length < 1) {
    <article className={styles.tableSection}>
      <div className={styles.titleContainer}>
        <img src={images.info} alt='user_icon' />
        <h2>Transactions</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Ticket Type</th>
            <th>Amount</th>
            <th className={styles.address}>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan='5' className={styles.noTicket}>
              No used ticket found.
            </td>
          </tr>
        </tbody>
      </table>
    </article>;
  }
  return (
    <article className={styles.tableSection}>
      <div className={styles.titleContainer}>
        <img src={images.info} alt='user_icon' />
        <h2>Transactions</h2>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Ticket Type</th>
            <th>Amount</th>
            <th className={styles.address}>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {event.map((ticket) => {
            const { _ticketId, user } = ticket.data;
            const id = convertToIntegar(_ticketId._hex);
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>Check ticket info</td>
                <td>Check ticket info</td>
                <td>{user}</td>
                <td>Used</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};

export default TransactionTable;
