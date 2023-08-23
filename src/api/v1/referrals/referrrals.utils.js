const axios = require("axios");

const { decryptData } = require("../globals/utils/encryptData.utils");
const { getUser } = require("../user/user.services");

async function getReferrerCode(userId) {
  const currentUser = await getUser(userId);
  const paystackSecretKeyHash = currentUser?.paystack_secret_key;
  const paystackSecretKey = decryptData(paystackSecretKeyHash);
  const data = "";

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.paystack.co/transaction",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${paystackSecretKey}`,
    },
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
module.exports = {
  getReferrerCode,
};
