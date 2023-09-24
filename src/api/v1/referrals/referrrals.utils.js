import axios from 'axios';

// import { decryptData } from '../globals/utils/encryptData.utils.js';
import { getUser } from '../user/user.services.js';

async function getReferrerCode(userId) {
  const currentUser = await getUser(userId);
  const blocSecretKeyHash = currentUser?.bloc_secret_key;
  const blocSecretKey = decryptData(blocSecretKeyHash);
  const data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.bloc.co/transaction',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${blocSecretKey}`
    }
  };

  const response = await axios(config);

  const transactions = await response.data;
  const referrerTransaction = transactions.data[0]; // always gonna be the first transaction;
  // console.log(referrerTransaction, 'shege')
  // console.log(transactions)
  // const cash = [];
  // const amounts = transactions.data.reduce((money, transaction) => {
  //   // console.log(transaction.metadata.custom_fields[0]);
  //   if (transaction.metadata?.custom_fields) {
  //     console.log(transaction.metadata.custom_fields[0].value);

  //     money.push(transaction.amount / 100);
  //   }
  //   return money;
  // }, cash);
  // console.log(amounts);
  const referrerCode = referrerTransaction.metadata.custom_fields[0].value;
  console.log(referrerCode);

  return referrerCode;
}
export default {
  getReferrerCode
};
