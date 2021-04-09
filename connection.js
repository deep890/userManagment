const mongoose = require('mongoose');
const connectdb = async() =>{
    try{
        // mongo connection string
        const con = await mongoose.connect('mongodb+srv://deepti:maheshwari1310@managment.ehdrq.mongodb.net/managment?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true
        });
        console.log(`mongodb space connected:${con.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}
module.exports = connectdb 