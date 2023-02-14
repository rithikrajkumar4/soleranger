const app = require("./app");

const dotenv = require('dotenv');
const connnectDatabase = require('./config/database')

// Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`)
    process.exit(1);
})

//config
dotenv.config({path:'backend/config/config.env'})

//connect database
connnectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejection Error
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.message} `);
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    })
})