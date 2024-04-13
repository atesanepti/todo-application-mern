const { Session } = require("../controllers/signin.controller");
const { getCookie } = require("../lib/ops");

const auth = async (req, res, next) => {
  const cookie = getCookie(req.get("Cookie"));
  
  const sessionData = await Session.find({ key: cookie });
  if (sessionData.length > 0) {

    req.auth = true;
    next();
  } else {
    req.auth = false;
    next();
  }
};

module.exports = auth;
