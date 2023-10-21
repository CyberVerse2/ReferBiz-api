import axios from 'axios';

// import { decryptData } from '../globals/utils/encryptData.utils.js';
import { getUser } from '../user/user.services.js';
import { config } from 'dotenv';
import { AppError } from '../globals/utils/errors.util.js';
config();

async function getCheckoutLink(body) {
  const newBody = {
    ...body,
    customer_email: `${body.customer_email.split('@')[0]}@orchs.xyz`
  };
  const data = JSON.stringify(newBody);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.blochq.io/v1/checkout/new',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BLOC_PUBLIC_KEY}`
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(response);
    const checkoutLink = response.data?.data;
    console.log(checkoutLink)
    if (!checkoutLink) throw new AppError('Failed to create checkout link');
    return checkoutLink;
  } catch (error) {
    throw new AppError(error);
  }
}

export { getCheckoutLink };
