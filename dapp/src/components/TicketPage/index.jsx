import React, { useState } from 'react';
import { contractAddress } from '../../utils/utils';
import { useContract, useOwnedNFTs, useAddress } from '@thirdweb-dev/react';
import styles from './ticket.module.scss';
import TicketDetails from './TicketDetails';

const Ticket = () => {
  const [index, setIndex] = useState(0);
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const { data, isLoading, error } = useOwnedNFTs(contract, address);

  if (isLoading || data === undefined) {
    return (
      <section className={styles.ticketContainer}>
        <p className={styles.ticketContainer__loadingText}>
          Please wait a moment <br />
          retrieveing your tickets...
        </p>
      </section>
    );
  }

  if (data.length < 1) {
    return (
      <section className={`${styles.ticketContainer} ${styles.noTicket}`}>
        <h1 className={styles.ticketContainer__noTicketText}>
          No Ticket Found
        </h1>
      </section>
    );
  }

  let ticketIDs = data.map((ticket) => ticket.metadata.id);

  return (
    <TicketDetails ticketIDs={ticketIDs} index={index} setIndex={setIndex} />
  );
};

export default Ticket;
