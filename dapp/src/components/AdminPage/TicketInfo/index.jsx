import React from 'react';
import styles from './ticketInfo.module.scss';
import {
  contractAddress,
  convertToIntegar,
  convertUnixToTime,
} from '../../../utils/utils';
import { useContractRead, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const TicketInfo = (props) => {
  const { contract } = useContract(contractAddress);
  const _ticketId = Number(props.ticketID);
  const { data, isLoading, error } = useContractRead(
    contract,
    'getTicket',
    _ticketId
  );

  if (isLoading || data === undefined) {
    return (
      <article className={styles.article}>
        <p className={styles.article__loadingText}>In a moment please...</p>
      </article>
    );
  }

  let ticketType = data[0],
    validity = data[1]._hex,
    amount = data[2]._hex,
    owner = data[3],
    dateCreated = data[4],
    ticketID = data[5]._hex,
    ipfs = data[6],
    confirmTicketUse = data[7],
    used = data[8];

  const weiValue = ethers.BigNumber.from(`${convertToIntegar(amount)}`);
  const etherValue = ethers.utils.formatEther(weiValue);

  return (
    <article className={styles.article} onClick={(e) => e.stopPropagation()}>
      <h3 className={styles.title}>Ticket Info</h3>
      <div className={styles.infoContainer}>
        <p>
          Ticket Type : <span>{ticketType}</span>
        </p>
        <p>
          Ticket ID : <span>{convertToIntegar(ticketID)}</span>
        </p>
        <p>
          Ticket amount : <span>{`${etherValue} ETH`}</span>
        </p>
        <p>
          Owner Address: <span>{owner}</span>
        </p>

        <p>
          Date Created : <span> {convertUnixToTime(dateCreated)}</span>
        </p>
        <p>
          Expiry Date : <span>{convertUnixToTime(validity)}</span>
        </p>
        <p>
          Confirm Use : <span>{used ? 'confirmed' : 'Not confirmed'}</span>
        </p>
        <p>
          Used:{' '}
          {used !== confirmTicketUse ? 'Awaiting' : used ? 'used' : 'Not Used'}
        </p>
      </div>
    </article>
  );
};

export default TicketInfo;
