import axios from 'axios';

// import { decryptData } from '../globals/utils/encryptData.utils.js';
import { getUser } from '../user/user.services.js';
import { config } from 'dotenv';
import { AppError } from '../globals/utils/errors.util.js';
config();

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

async function getCheckoutLink(body) {
  const data = JSON.stringify(body);
  console.log(process.env.BLOC_PUBLIC_KEY);
  console.log(body)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.blochq.io/v1/checkout/new',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BLOC_PUBLIC_KEY}`
    },
    data:data
  };

  try {
    const response = await axios.request(config);
    console.log(response)
    const checkoutLink = response.data?.data;
    if (!checkoutLink) throw new AppError('Failed to create checkout link');
    return checkoutLink;
  } catch (error) {
    throw new AppError(error);
  }
}

export { getReferrerCode, getCheckoutLink };
