const AWS = require("aws-sdk");
const express = require("express");
const server = express();
const authRoutes = require("./auth/auth-router");

server.use(express.json());
server.use("/api/auth", authRoutes);

module.exports = server;