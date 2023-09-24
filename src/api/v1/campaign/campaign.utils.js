import axios from 'axios';
import { getUser } from '../user/user.services.js';
// import { decryptData } from '../globals/utils/encryptData.utils.js';

async function createPaymentLink(userId, name) {
  const currentUser = await getUser(userId);
  const blocSecretKeyHash = currentUser?.bloc_secret_key;
  const blocSecretKey = await decryptData(blocSecretKeyHash);
  let data = JSON.stringify({
    name: name,
    custom_fields: [
      {
        display_name: 'Referral Code',
        variable_name: 'Referral code'
      }
    ]
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.bloc.co/page',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${blocSecretKey}`
    },
    data: data
  };

  const response = await axios(config);

  const slug = await response.data.data.slug;
  console.log(slug);
  let paymentLink = `https://bloc.com/pay/${slug}`;
  return paymentLink;
}

export {
  createPaymentLink
};
