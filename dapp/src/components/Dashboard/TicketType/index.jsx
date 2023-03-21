import { useState } from 'react';
import { useContractWrite, useContract, Web3Button } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import SelectInput from '../SelectInput';
import styles from './ticketType.module.scss';
import { getAmount, contractAddress } from '../../../utils/utils';
import SuccessModal from '../SuccessModal';
import Loading from '../Loading';
import Input from '../Inputs';

const TicketType = () => {
  const [onSuccessful, setOnSuccessful] = useState(false);
  const [onError, setOnError] = useState(false);
  const [ticketTypeOf, setTicketTypeOf] = useState(null);
  const [validity, setValidity] = useState(null);

  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, 'mint');

  const ticketType = ['voucher', 'meal ticket'];
  const { cryptoValue, value } = getAmount(ticketTypeOf);
  const _validUntil = Date.parse(validity) / 1000;
  const _ticketType = ticketTypeOf;
  const now = new Date();
  const minDate = now.toISOString().slice(0, 10); // Today's date in ISO format
  const maxDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10); // Three days from now in ISO format

  // Handle date change
  const handleDateChange = (e) => {
    const validity = e.target.value;
    // Check if the selected date is within the allowed range
    if (validity >= minDate && validity <= maxDate) {
      setValidity(validity);
    } else {
      alert('Please select a date within the next three days.');
    }
  };

  const handleSuccess = (result) => {
    setOnSuccessful(true);
    setTicketTypeOf('select type');
    console.log(result);
  };

  const handleError = (error) => {
    setOnError(true);
    console.log(error.message);
  };

  return (
    <>
      <div className={styles.ticketTypeContainer}>
        <div className={styles.ticketTypeContainer__selectTicket}>
          <SelectInput
            label='type'
            name='type'
            id='type'
            options={ticketType}
            onChange={(e) => setTicketTypeOf(e.target.value)}
            value={ticketTypeOf ? ticketTypeOf : 'select type'}
          />
        </div>
        <div
          className={`${styles.ticketTypeContainer__selectTicket} ${styles.amountContainer}`}
        >
          <p>Amount</p>
          <p>{value ? `${value}ETH` : 'please select type'}</p>
        </div>
        <div className={styles.ticketTypeContainer__selectTicket}>
          <Input
            label='validity'
            name='validity'
            id='validity'
            type='date'
            value={validity ? validity : ''}
            onChange={(e) => handleDateChange(e)}
            // min={minDate}
            // max={maxDate}
          />
        </div>
        <div className={styles.ticketTypeContainer__selectTicket}>
          <Web3Button
            contractAddress={contractAddress}
            action={() =>
              mutateAsync([
                _ticketType,
                _validUntil,
                {
                  gasLimit: 3000000, // override default gas limit
                  value: ethers.utils.parseEther(`${value}`), // send 0.1 ether with the contract call
                },
              ])
            }
            onSuccess={(result) => handleSuccess(result)}
            onError={(error) => handleError(error)}
            isDisabled={!ticketTypeOf ? true : false}
            className={`${styles.purchaseButton} ${
              !ticketTypeOf && styles.isDisabled
            }`}
          >
            Purchase Ticket
          </Web3Button>
        </div>
      </div>
      {isLoading && <Loading text={'Transaction in progress....'} />}
      {onSuccessful && <SuccessModal setOnSuccessful={setOnSuccessful} />}
      {onError && <SuccessModal setOnError={setOnError} error={true} />}
    </>
  );
};

export default TicketType;
