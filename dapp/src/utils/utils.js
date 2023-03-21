export const contractAddress = '0xfe8B57856f174428B4ff1CdC39d1EA9929697A65';

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

export const convertUnixToTime = function (hex_string) {
  const unixTimestamp = hex_string;
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${month}/${day}/${year}`;
};

// export const getValidity = function getValidity(hex_string1, hex_string2) {
//   const createdDate = convertUnixToTime(hex_string1);
//   const expiryDate = convertUnixToTime(hex_string2);
//   const timeDiff = expiryDate.getTime() - createdDate.getTime();
//   const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
//   if (dayDiff <= 0) {
//     return 'expired';
//   }
//   return `${dayDiff} Day(s)`;
// };

// export const getValidity = function getValidity(hex_string1, hex_string2) {
//   const createdDate = new Date(convertToIntegar(hex_string1) * 1000);
//   const expiryDate = new Date(convertToIntegar(hex_string2) * 1000);
//   const timeDiff = expiryDate.getTime() - createdDate.getTime();
//   const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   if (dayDiff <= 0) {
//     return 'expired';
//   }
//   return `${dayDiff} Day(s)`;
// };

export const getValidity = function (hex_string1, hex_string2) {
  // const datetime1 = convertToIntegar(hex_string1) * 1000;
  // const datetime2 = convertToIntegar(hex_string2) * 1000;
  const diffSeconds = Math.abs(hex_string2 * 1000 - hex_string1 * 1000) / 1000;
  const diffDays = diffSeconds / 86400;

  if (diffDays <= 0) {
    return 'expired';
  }
  return `${diffDays} Day(s)`;
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
