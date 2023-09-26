require("dotenv").config();

const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

const encryption = (data) => {
  return cryptr.encrypt(data);
};
const decryption = (data) => {
  return cryptr.decrypt(data);
};

module.exports = {
  encryption,
  decryption,
};

console.log(encryption("goodluck"));
