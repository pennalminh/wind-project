const { callAPIWindy } = require("../api/windy");
const { caculatorWindSpeed, powerWind } = require("../common/fomular");
const {
  getNumberTimePerday,
  getLimitRecordOfWindApi,
  getIn2Day,
} = require("../db/queryData");

const exportPowerForeCastByPeriodInDay = async (numPeriod) => {
  // P API+1
  const arrPAPIPlus1 = await getPowerWinInNextDayWindy();

  // Lấy dữ liệu thật trong DB
  const arrWsActualMinus1 = await getNumberTimePerday(numPeriod);
  const arrPActualMinus1 = arrWsActualMinus1.map((ws) => powerWind(2, 6, ws));

  // Lấy dữ liệu windyAPI được lưu trong DB
  // 8 là 1 ngày gần nhất
  const dataWindAPIMinus1 = await getLimitRecordOfWindApi(8);

  let arrWsAPIMinus1 = [];
  dataWindAPIMinus1.reverse().forEach((ws) => {
    for (let index = 0; index < 12; index++) {
      arrWsAPIMinus1.push(ws);
    }
  });

  // Tính sai số
  let arrDeviation = [];
  for (let index = 0; index < arrPActualMinus1.length; index++) {
    const deviation =
      ((arrPActualMinus1[index] - arrWsAPIMinus1[index]) / 30) * 100;
    arrDeviation.push(deviation);
  }

  // Tính P dự báo
  let arrPForecast = [];
  for (let index = 0; index < arrPAPIPlus1.length; index++) {
    if (isNaN(arrDeviation[index])) {
      arrPForecast.push(arrPAPIPlus1[index]);
    } else {
      const pForecast =
        arrPAPIPlus1[index] + arrDeviation[index] * arrPAPIPlus1[index];
      arrPForecast.push(pForecast);
    }
  }

  return arrPForecast;
};

const getPowerWinInNextDayWindy = async () => {
  const response = await callAPIWindy();
  let arr96Pw = [];
  for (let index = 2; index < 10; index++) {
    const ws = caculatorWindSpeed(
      response.data["wind_u-surface"][index],
      response.data["wind_v-surface"][index]
    );
    const pw = powerWind(2, 6, ws);
    for (let j = 0; j < 12; j++) {
      arr96Pw.push(pw);
    }
  }

  return arr96Pw;
};

const getPowerWinInNext2DayWindy = async () => {
  const response = await callAPIWindy();
  let arr48Pw = [];
  for (let index = 2; index < 18; index++) {
    const ws = caculatorWindSpeed(
      response.data["wind_u-surface"][index],
      response.data["wind_v-surface"][index]
    );
    const pw = powerWind(2, 6, ws);
    for (let j = 0; j < 3; j++) {
      arr48Pw.push(pw);
    }
  }

  return arr48Pw;
};

const exportPowerForeCastByPeriodIn2Day = async (numPeriod) => {
  // P API+1
  const arrPAPIPlus1 = await getPowerWinInNext2DayWindy();

  // Lấy dữ liệu thật trong DB
  const arrWsActualMinus1 = await getIn2Day(numPeriod);
  const arrPActualMinus1 = arrWsActualMinus1.map((ws) => powerWind(2, 6, ws));

  // Lấy dữ liệu windyAPI được lưu trong DB
  // 16 là 2 ngày gần nhất
  const dataWindAPIMinus1 = await getLimitRecordOfWindApi(16);

  let arrWsAPIMinus1 = [];
  dataWindAPIMinus1.reverse().forEach((ws) => {
    for (let index = 0; index < 3; index++) {
      arrWsAPIMinus1.push(ws);
    }
  });

  // Tính sai số
  let arrDeviation = [];
  for (let index = 0; index < arrPActualMinus1.length; index++) {
    const deviation =
      ((arrPActualMinus1[index] - arrWsAPIMinus1[index]) / 30) * 100;
    arrDeviation.push(deviation);
  }

  // Tính P dự báo
  let arrPForecast = [];
  for (let index = 0; index < arrPAPIPlus1.length; index++) {
    if (isNaN(arrDeviation[index])) {
      arrPForecast.push(arrPAPIPlus1[index]);
    } else {
      const pForecast =
        arrPAPIPlus1[index] + arrDeviation[index] * arrPAPIPlus1[index];
      arrPForecast.push(pForecast);
    }
  }

  return arrPForecast;
};

module.exports = {
  exportPowerForeCastByPeriodInDay,
  exportPowerForeCastByPeriodIn2Day,
};
