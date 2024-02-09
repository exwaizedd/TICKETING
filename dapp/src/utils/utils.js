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
  return `${day}/${month}/${year}`;
};

// function checkValidity(hexTimestamp) {
//   const timestamp = parseInt(hexTimestamp);
//   const expiryDate = new Date(timestamp * 1000);
//   const currentDate = new Date();

//   if (currentDate > expiryDate) {
//     return `${convertUnixToTime(hexTimestamp)} Expired`;
//   } else {
//     const daysLeft = Math.ceil(
//       (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
//     );
//     return `Expires in ${daysLeft} day${
//       daysLeft === 1 ? '' : 's'
//     } (${expiryDate.toLocaleDateString()})`;
//   }
// }

export const checkValidity = function checkValidity(hexTimestamp) {
  const timestamp = parseInt(hexTimestamp);
  const expiryDate = new Date(timestamp * 1000);
  const currentDate = new Date();

  if (currentDate > expiryDate) {
    return `Expired`;
  } else {
    ('ticket used');
  }
};

export const getValidity = function getValidity(validity) {
  // Set the date to check
  const dateToCheck = new Date(convertUnixToTime(validity));

  // Get the current date
  const currentDate = new Date();

  // Check if the date has passed
  if (currentDate > dateToCheck) {
    return 'Expired';
  } else {
    return convertUnixToTime(validity);
  }
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
