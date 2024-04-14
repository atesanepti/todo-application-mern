// @Dependendices
const path = require("path");
const {User} = require("../controllers/signup.controller")
const {Session} = require("../controllers/signin.controller")

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

const getUserInfo = async (req,res,next)=>{
  try{
    const { authKey } = req.query;
    if (authKey) {
      const userAuth = await Session.find({ key: authKey }, { _id: 0, _v: 0 });
      if (userAuth.length > 0) {
        const userId = userAuth[0]["id"];
        const userData = await User.find(
          { _id: userId },
          { _id: 0, _v: 0, email: 0, password: 0, profile: 0, created: 0 }
        );
        if (userData.length > 0) {
          res.status(200).json({
            success: true,
            payload: { name: userData[0]["fullName"] },
          });
        } else {
          res.status(202).json({
            success: false,
            message: "user not found",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Auth not created",
        });
      }
    } else {
      res.status(202).json({
        success: false,
      });
    }
  }
  catch(error){
    next(error)
  }
}

const deleteCookie = async (req, res, next) => {
  try {
    const { authKey } = req.query;
    if (authKey) {
      const authData = await Session.deleteOne({ key: authKey });
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
};


module.exports = { rootController, getUserInfo, deleteCookie };
