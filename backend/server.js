require("dotenv").config();
const http = require('http');
const app = require('./app/app');
require("./config/dbConnect")


const port = process.env.PORT || 2025

const server = http.createServer(app)
server.listen(port, () => {
    `server is running on port ${port}`
});

// console.log(app)