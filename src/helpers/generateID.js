const char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateID = (length) => {
  let len = length ? length : 8;
  let result = "";
  for (var i = len; i > 0; --i) {
    result += char[Math.floor(Math.random() * char.length)];
  }
  return result;
};

module.exports = generateID;
