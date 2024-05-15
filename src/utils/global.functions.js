function generateWorkerCode(length = 5) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateOrderNumber() {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, "");
  const uniquePart = Math.random().toString(36).substring(2, 6);
  return `${dateString}-${uniquePart}`;
}

module.exports = { generateWorkerCode, generateOrderNumber };
