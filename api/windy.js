const axios = require("axios");
require("dotenv").config();

const url = process.env.URL_API_WINDY;

const body = {
  lat: process.env.LAT,
  lon: process.env.LONG,
  model: "gfs",
  parameters: ["wind"],
  levels: ["surface"],
  key: process.env.TOKEN_API_WINDY,
};

const callAPIWindy = async () => {
  try {
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};

callAPIWindy();

module.exports = {
  callAPIWindy,
};
