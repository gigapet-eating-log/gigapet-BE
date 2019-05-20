const cors = require("cors");
const express = require('express')
const helmet = require('helmet')

//routes
const authRouter = require("../routes/authRouter.js")
const gpRouter = require("../routes/gpRouter.js")

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


server.use('/api/users', authRouter);
server.use('/api/app', gpRouter);

module.exports = server