"use strict";
require("dotenv").config();

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.DOMAIN_FE);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

module.exports = allowCrossDomain;
