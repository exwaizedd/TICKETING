import { useState } from 'react';
import { useContractWrite, useContract, Web3Button } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import SelectInput from '../SelectInput';
import styles from './ticketType.module.scss';
import { convertToUnix, getAmount } from '../../../utils/utils';

const contractAddress = '0xD47b598f17aA0457cC299Bcf907AC93E4cd7C0b';

const TicketType = () => {
  const [ticketInfo, setTicketInfo] = useState({
    type: '',
    validity: '',
  });

  const { contract } = useContract(contractAddress);
  const {
    mutateAsync: mint,
    isLoading,
    error,
  } = useContractWrite(contract, 'mint');

  function handleChange(e) {
    const value = e.target.value;

    setTicketInfo({
      ...ticketInfo,

      [e.target.name]: value,
    });
  }
  const ticketType = ['voucher', 'meal ticket'];
  const validity = ['1 Day', '2 Days', '3 Days'];
  const { cryptoValue, value } = getAmount(ticketInfo.type);
  const ticketValidity = convertToUnix(ticketInfo.validity);

  const call = async () => {
    try {
      const data = await mint([ticketType, ticketValidity]);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.ticketTypeContainer}>
      <div className={styles.ticketTypeContainer__selectTicket}>
        <SelectInput
          label='type'
          name='type'
          id='type'
          options={ticketType}
          onChange={(e) => handleChange(e)}
          value={ticketInfo.value}
        />
      </div>
      <div
        className={`${styles.ticketTypeContainer__selectTicket} ${styles.amountContainer}`}
      >
        <p>Amount</p>
        <p>{value ? `${value}ETH` : 'please select type'}</p>
      </div>
      <div className={styles.ticketTypeContainer__selectTicket}>
        <SelectInput
          label='validity'
          name='validity'
          id='validity'
          options={validity}
          onChange={(e) => handleChange(e)}
          value={ticketInfo.amount}
        />
      </div>
      <div className={styles.ticketTypeContainer__selectTicket}>
        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.call('mint', ticketType, ticketInfo)}
          overrides={{
            gasLimit: 3000000, // override default gas limit
            value: ethers.utils.parseEther(value), // send 0.1 ether with the contract call
          }}
          onSuccess={(result) => alert('Success!')}
          onError={(error) => alert('Something went wrong!')}
          className={styles.purchaseButton}
        >
          Purchase Ticket
        </Web3Button>
      </div>
    </div>
  );
};

export default TicketType;
