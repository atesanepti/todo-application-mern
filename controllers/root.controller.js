// @Dependendices
const path = require("path");


const rootController = (req, res, next) => {
  try {
    if(req.auth){
      res.status(200).sendFile(path.join(__dirname, "../views/index.html"));
    }
    else{
      res.redirect("./signin")
    }
    
  } catch (error) {
    next(error);
  }
};

module.exports = { rootController };
