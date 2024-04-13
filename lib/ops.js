const moment = require("moment-timezone");

function tokenGen(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let holder = "";
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * 40) + 1;
    holder += chars[random];
  }
  return holder;
}

function getCookie(string) {
  string = typeof string === "string" ? string : false;
  if (string) {
    const silceIndex = string.indexOf("=");
    string = string.slice(silceIndex + 1);
    return string;
  } else {
    return "";
  }
}

function getBDTime(currentDate) {
  const bdDate = new Date(moment.tz(new Date(), "Asia/Dhaka"));
  const bdTime = bdDate.toLocaleDateString("en-BD")
  return bdTime;
}

module.exports = {
  tokenGen,
  getCookie,
  getBDTime,
};
