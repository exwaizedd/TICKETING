import React from 'react';
import styles from './profilePage.module.scss';
import { contractAddress, convertToIntegar } from '../../utils/utils';
import {
  useContract,
  useOwnedNFTs,
  useBalance,
  useAddress,
  useContractRead,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/images';

const Profile = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const {
    data: tickets,
    isLoading: loading,
    error,
  } = useOwnedNFTs(contract, address);
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const { data: ticketUsed, isLoading: isLoadingTicketUsed } = useContractRead(
    contract,
    'getUsedTicketCount',
    address
  );
  const { data: validTicket, isLoading: isLoadingValidTicket } =
    useContractRead(contract, 'getValidTicketCount', address);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard/ticket');
  };

  return (
    <section className={styles.profileSection}>
      <div className={styles.ProfileContainer}>
        <div className={styles.ProfileContainer__profileIconContainer}>
          <img
            src={images.user}
            alt='user_profileIcon'
            className={styles.profileIcon}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.address_balance_container}>
          <div className={styles.address_balance_container__balanceContainer}>
            <div className={styles.innerBalanceContainer}>
              <img src={images.ethereum} alt='ethereum_icon' />{' '}
              <p>{`${address.substring(0, 4)}...${address.substring(
                address.length - 4
              )}`}</p>
            </div>
            <p className={styles.amount}>
              {' '}
              {isLoading ? 'loading...' : `${data.displayValue}${data.symbol}`}
            </p>
          </div>
          <img src={images.info} alt='info_Icon' className={styles.infoIcon} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.ticketContainer}>
          <p className={styles.ticketContainer__text}>
            <span>
              Total Ticket Minted :{' '}
              {loading || !tickets
                ? 'retrieving minted tickets...'
                : tickets.length < 1
                ? '0'
                : tickets.length}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.ticketContainer}>
          <p className={`${styles.ticketContainer__text} ${styles.background}`}>
            {' '}
            <span>
              Total Ticket Used :{' '}
              {isLoadingTicketUsed || !ticketUsed
                ? 'retrieving used tickets...'
                : convertToIntegar(ticketUsed._hex)}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.ticketContainer} ${styles.bordeBottom}`}>
          <p className={`${styles.ticketContainer__text} `}>
            {' '}
            <span>
              Total Valid Ticket:{' '}
              {isLoadingValidTicket || !ticketUsed
                ? 'retrieving valid tickets...'
                : convertToIntegar(validTicket._hex)}
            </span>
          </p>
        </div>
      </div>

      <button className={styles.viewTicketButton} onClick={handleNavigate}>
        View Tickets
      </button>
    </section>
  );
};

export default Profile;
