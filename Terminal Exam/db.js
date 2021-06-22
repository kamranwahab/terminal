const mysql = require('mysql');
const express = require("express");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port:process.env.DATABASE_PORT
  });

module.exports = connection