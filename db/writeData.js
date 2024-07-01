"use strict";

const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const schedule = require("node-schedule");
const { callAPIWindy } = require("../api/windy");
const { caculatorWindSpeed } = require("../common/fomular");
require("dotenv").config();

const url = process.env.URL_INFLUX_DB;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.ORGANIZATION_ID;
const bucket = process.env.INFLUX_BUCKET;
const bucket_windy_api = process.env.INFLUX_BUCKET_WINDY_API;

// Instantiate the InfluxDB client
const influxDB = new InfluxDB({ url, token });

// Create a write client from the getWriteApi method, providing your org and bucket.

// Apply default tags to all points if needed
const writeDataWindyEvery3h = async () => {
  const writeApi = influxDB.getWriteApi(org, bucket);
  schedule.scheduleJob("0 */3 * * *", async function () {
    const response = await callAPIWindy();
    const wind_u = response.data["wind_u-surface"][1];
    const wind_v = response.data["wind_v-surface"][1];
    const windSpeed = caculatorWindSpeed(wind_u, wind_v);

    const point = new Point(bucket_windy_api)
      .tag("wind", "val")
      .floatField("value", windSpeed);

    writeApi.writePoint(point);

    await writeApi.flush();
    console.log("WRITE FINISHED");
  });
};

module.exports = {
  writeDataWindyEvery3h,
};
