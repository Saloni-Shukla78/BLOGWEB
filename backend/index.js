require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {connectToDatabase} = require('./connection')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')

const app = express()
port = process.env.PORT
connectToDatabase();

app.use(cors());

app.use(express.json());
app.use('/auth',authRoute);
app.use('/post',postRoute)

// app.get('/',(req,res) =>{
//     res.send('Hello from express....')
// })


app.listen(port ,() => console.log(`Server started at ${port}`))
