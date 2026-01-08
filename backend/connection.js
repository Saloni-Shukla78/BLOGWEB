const mongoose = require('mongoose')

const connectToDatabase = async() =>{
    try{
        // const dbName = process.env.DB_NAME
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:process.env.DB_NAME,
        });
        console.log('Conntected to database..');
    }catch(error){
        console.log(error.message);
    }
   

}

module.exports = {connectToDatabase}; 