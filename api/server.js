const AWS = require("aws-sdk");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const authRoutes = require("./auth/auth-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRoutes);

module.exports = server;