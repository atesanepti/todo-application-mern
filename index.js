const app = require("./app")
require('dotenv').config();
const { connect } = require("./models/model.utiles");



// const confing = {
//     PORT : process.env.PORT || 8080
// }
const PORT = process.env.PORT


app.listen(PORT,async (error)=>{
    if(!error){
        console.log(`Server is running at ${PORT}`);
        await connect();
    }
    else{
        console.log(error.message);
    }
})