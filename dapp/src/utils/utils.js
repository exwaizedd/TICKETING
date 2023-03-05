export const getAmount = function getAmount(ticketType) {
  switch (ticketType) {
    case 'voucher':
      return { cryptoValue: '0.02ETH', value: 0.02 };
    case 'meal ticket':
      return { cryptoValue: '0.01ETH', value: 0.01 };
    default:
      return '';
  }
};

export const convertToUnix = function converter(days) {
  const dayNum = Number(days.slice(0, 1));
  const unixTime = Math.floor(dayNum * 86400 + 0); // convert the number of days to Unix time (in seconds)
  return unixTime;
};

export const convertToIntegar = function convertToIntegar(hex_string) {
  return parseInt(hex_string, 16);
};

export const convertFromUnix = function convertFromUnix(number) {
  return convertToIntegar(number) / 86400;
};

export const incrementIndex = function incrementIndex(num1, num2) {
  let newNum = num1 + 1;
  if (newNum > num2) {
    return (newNum = 0);
  }

  return newNum;
};

export const decreaseIndex = function decreaseIndex(num1, num2) {
  let newNum = num1 - 1;
  if (newNum < 0) {
    return (newNum = num2);
  }
  return newNum;
};
