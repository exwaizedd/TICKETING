import { useState } from 'react';
import { useContractWrite, useContract, Web3Button } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import SelectInput from '../SelectInput';
import styles from './ticketType.module.scss';
import { convertToUnix, getAmount } from '../../../utils/utils';
import SuccessModal from '../SuccessModal';
import Loading from '../Loading';

const contractAddress = '0x89ae7403e2D38426949185D0399346a335c5d91c';

const TicketType = () => {
  const [onSuccessful, setOnSuccessful] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({
    type: '',
    validity: '',
  });

  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(contract, 'mint');

  function handleChange(e) {
    const value = e.target.value;

    setTicketInfo({
      ...ticketInfo,
      [e.target.name]: value,
    });
  }
  const ticketType = ['voucher', 'meal ticket'];
  const validity = ['1 Day', '2 Days', '3 Days', '4 Days'];
  const { cryptoValue, value } = getAmount(ticketInfo.type);
  const _validUntil = convertToUnix(ticketInfo.validity);
  const _ticketType = ticketInfo.type;

  const handleSuccess = (result) => {
    setOnSuccessful(true);
    setTicketInfo({
      ...ticketInfo,
      type: '',
      validity: '',
    });
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
            onError={(error) => alert('Something went wrong!')}
            isDisabled={!ticketInfo.type || !ticketInfo.validity ? true : false}
            className={styles.purchaseButton}
          >
            Purchase Ticket
          </Web3Button>
        </div>
      </div>
      {isLoading && <Loading />}
      {onSuccessful && <SuccessModal setOnSuccessful={setOnSuccessful} />}
    </>
  );
};

export default TicketType;
