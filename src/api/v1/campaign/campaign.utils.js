const axios = require("axios");
const { getUser } = require("../user/user.services");
const { decryptData } = require("../globals/utils/encryptData.utils");

async function createPaymentLink(userId, name) {
  const currentUser = await getUser(userId);
  const paystackSecretKeyHash = currentUser?.paystack_secret_key;
  const paystackSecretKey = await decryptData(paystackSecretKeyHash);
  let data = JSON.stringify({
    name: name,
    metadata: {
      custom_fields: [
        {
          display_name: "Referral Code",
          variable_name: "referral_code",
        },
      ],
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.paystack.co/page",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${paystackSecretKey}`,
    },
    data: data,
  };

  const response = await axios(config);

  const slug = await response.data.data.slug;
  console.log(slug);
  let paymentLink = `https://paystack.com/pay/${slug}`;
  // paymentLink = paymentLink.replace(/"/g, "'");

  return paymentLink;
}

module.exports = {
  createPaymentLink,
};
