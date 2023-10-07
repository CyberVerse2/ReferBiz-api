import axios from 'axios';

// import { decryptData } from '../globals/utils/encryptData.utils.js';
import { getUser } from '../user/user.services.js';
import { config } from 'dotenv';
import { AppError } from '../globals/utils/errors.util.js';
config();

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

export {getCheckoutLink };
