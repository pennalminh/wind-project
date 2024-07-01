const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

/** Environment variables **/
const url = process.env.URL_INFLUX_DB;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.ORGANIZATION_ID;

const influxDB = new InfluxDB({ url, token });
const queryApi = influxDB.getQueryApi(org);

const getNumberTimePerday = async (numberTimeInDay) => {
  const groupPerMinute = 1440 / numberTimeInDay;
  let currentTime = groupPerMinute;
  let arrResponse = new Array(numberTimeInDay).fill(null);

  for (let index = 0; index < numberTimeInDay; index++) {
    const fluxQuery = `
    from(bucket: "${process.env.INFLUX_BUCKET}")
    |> range(start: -${currentTime + groupPerMinute}m, stop: -${currentTime}m) 
    |> filter(fn: (r) => r.device == "Turbine1" or  r.device == "Turbine2")
    |> group()
    |> mean()
    `;

    currentTime += groupPerMinute;
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values);
      arrResponse[index] = o._value;
    }
  }

  return arrResponse.reverse();
};

const getIn2Day = async (numberTime) => {
  const groupPerMinute = 48 / getIn2Day;
  let currentTime = groupPerMinute;
  let arrResponse = new Array(getIn2Day).fill(null);

  for (let index = 0; index < getIn2Day; index++) {
    const fluxQuery = `
    from(bucket: "${process.env.INFLUX_BUCKET}")
    |> range(start: -${currentTime + groupPerMinute}h, stop: -${currentTime}h) 
    |> filter(fn: (r) => r.device == "Turbine1" or  r.device == "Turbine2")
    |> group()
    |> mean()
    `;

    currentTime += groupPerMinute;
    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values);
      arrResponse[index] = o._value;
    }
  }

  return arrResponse.reverse();
};

const getLimitRecordOfWindApi = async (limit) => {
  const fluxQuery = `
   from(bucket: "${process.env.INFLUX_BUCKET_WINDY_API}")
    |> range(start: -5d)
    |> filter(fn: (r) => r._measurement == "wind_api")
    |> sort(columns: ["_time"], desc: true)
    |> limit(n: ${limit})
    `;

  let arrResponse = [];

  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
    const o = tableMeta.toObject(values);
    arrResponse.push(o._value);
  }
  return arrResponse;
};

module.exports = {
  getLimitRecordOfWindApi,
  getNumberTimePerday,
  getIn2Day,
};
