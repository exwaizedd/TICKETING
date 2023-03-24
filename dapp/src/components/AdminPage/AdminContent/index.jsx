import React, { useState, useCallback } from 'react';
import styles from './adminBody.module.scss';
import {
  Web3Button,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import {
  contractAddress,
  convertFromUnix,
  convertToIntegar,
} from '../../../utils/utils';
import Modal from '../../Modal';
import TicketInfo from '../TicketInfo';
import UseTicket from '../UseTicket';

const AdminBody = (props) => {
  const [ticketId, setTicketId] = useState('');
  const [focused, setFocused] = useState(false);
  const [onSuccessful, setOnSuccessful] = useState(false);
  const [showError, setShowError] = useState(false);
  const [onWithdrawal, setOnWithdrawal] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const address = useAddress();
  const regex = /^(0|[1-9][0-9]*)$/;
  const { contract } = useContract(contractAddress);
  // get contract balance
  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useContractRead(contract, 'getBalance');
  // get max supply
  const { data: maxSupply, isLoading: isLoadingMaxSupply } = useContractRead(
    contract,
    'maxSupply'
  );
  // get total tickets minted
  const { data: totalTicket, isLoading: isLoadingTotalTicket } =
    useContractRead(contract, 'ticketId');

  // use ticket
  const { mutateAsync, isLoading } = useContractWrite(contract, 'useTicket');

  // withdraw
  const { mutateAsync: withdraw, isLoading: isLoadingWidthdrawal } =
    useContractWrite(contract, 'withdraw');

  // Memoized function to update state and ticket ID
  const updateStateAndTicketId = useCallback((newState, newTicketId) => {
    setTicketId(newTicketId);
    setShowTicketInfo(newState);
  }, []);

  const handleShowTicketInfo = () => {
    if (ticketId === '' || !regex.test(ticketId)) {
      return setFocused(true);
    }
    updateStateAndTicketId(true, ticketId);
  };

  const handleSuccess = (result) => {
    setOnSuccessful(true);
    setTicketId('');
  };
  const handleError = (error) => {
    setShowError(true);
  };

  const handleWithdrawalSuccess = (result) => {
    setOnWithdrawal(true);
    setTicketId('');
  };

  const handleWithdrawalError = (error) => {
    setShowError(true);
    setError(error.message);
  };
  return (
    <>
      <div className={styles.adminBody}>
        <div className={styles.adminBody__ticketAddressContainer}>
          <h2>Ticketing System</h2>
          <p className={styles.address}>{`${contractAddress.substring(
            0,
            5
          )}...${contractAddress.substring(address.length - 4)}`}</p>
          <p className={styles.balance}>
            {isLoadingContractBalance
              ? 'loading balance...'
              : `${(
                  parseInt(contractBalance._hex, 16) / Math.pow(10, 18)
                ).toFixed(4)} ETH`}
          </p>
          <div className={styles.TicketInfoContainer}>
            <p>
              Max. Supply:{' '}
              {isLoadingMaxSupply
                ? 'retrieving data...'
                : `${convertToIntegar(maxSupply._hex)}`}
            </p>
            <p>
              Total Ticket Minted:{' '}
              {isLoadingTotalTicket
                ? 'retrieving data...'
                : `${convertToIntegar(totalTicket._hex)}`}
            </p>
            <p>Ticket used: N/A</p>
          </div>
        </div>
        <div className={styles.adminBody__ticketAddressContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              type='text'
              name='id'
              id='id'
              value={ticketId}
              onChange={(event) => setTicketId(event.target.value)}
              pattern={regex}
              required
              onBlur={(e) => setFocused(true)}
              onFocus={(e) => setFocused(true)}
              focused={focused.toString()}
            />
            <span className={styles.span}>Enter a valid ticket Id</span>
            <label className={styles.inputContainer__label}>Ticket ID</label>
          </div>

          <Web3Button
            contractAddress={contractAddress}
            action={() => handleShowTicketInfo()}
            className={`${styles.web3button}  ${
              (!ticketId || ticketId === '' || !regex.test(ticketId)) &&
              styles.disabled
            }`}
            isDisabled={!ticketId || ticketId === '' || !regex.test(ticketId)}
          >
            view Ticket Info
          </Web3Button>
          <Web3Button
            action={() =>
              mutateAsync(ticketId, {
                gasLimit: 3000000, // override default gas limit
              })
            }
            onSuccess={(result) => handleSuccess(result)}
            onError={(error) => handleError(error)}
            contractAddress={contractAddress}
            className={`${styles.web3button}  ${
              (!ticketId || ticketId === '' || !regex.test(ticketId)) &&
              styles.disabled
            }`}
            isDisabled={!ticketId || ticketId === '' || !regex.test(ticketId)}
          >
            Use Ticket
          </Web3Button>
          <Web3Button
            contractAddress={contractAddress}
            action={() =>
              withdraw({
                gasLimit: 3000000, // override default gas limit
              })
            }
            onSuccess={(result) => handleWithdrawalSuccess(result)}
            onError={(error) => handleWithdrawalError(error)}
            className={`${styles.web3button}  ${
              (!ticketId || ticketId === '' || !regex.test(ticketId)) &&
              styles.disabled
            }`}
            isDisabled={!ticketId || ticketId === '' || !regex.test(ticketId)}
          >
            Withdraw Balance
          </Web3Button>
        </div>
      </div>
      {showTicketInfo && (
        <Modal onClick={() => setShowTicketInfo(false)}>
          <TicketInfo ticketID={ticketId} />
        </Modal>
      )}
      {(isLoading || isLoadingWidthdrawal) && (
        <Modal>
          <UseTicket isLoading={true} />
        </Modal>
      )}

      {onSuccessful && (
        <Modal onClick={() => setOnSuccessful(false)}>
          <UseTicket />
        </Modal>
      )}
      {showError && (
        <Modal onClick={() => setShowError(false)}>
          <UseTicket error={true} />
        </Modal>
      )}

      {onWithdrawal && (
        <Modal onClick={() => setOnWithdrawal(false)}>
          <UseTicket withdraw={true} />
        </Modal>
      )}
    </>
  );
};

export default AdminBody;
