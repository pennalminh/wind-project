const windPower3_6 = (ws) => {
  switch (true) {
    case ws < 2.75:
      return 0;
    case 2.75 <= ws && ws < 4:
      return 38594.4795 * ws * ws + -91774.18866 * ws + -6930.505107 - 10000;
    case 4 <= ws && ws < 5:
      return 50328.66804 * ws * ws + -179633.9254 * ws + 156761.425;
    case 5 <= ws && ws < 6:
      return 70574.72694 * ws * ws + -368403.0998 * ws + 594455.8249;
    case 6 <= ws && ws < 7:
      return 99800.19027 * ws * ws + -725397.4515 * ws + 1684305.255;
    case 7 <= ws && ws < 8:
      return 101486.9799 * ws * ws + -775460.2669 * ws + 1952092.272;
    case 8 <= ws && ws <= 9:
      return -93714.5505 * ws * ws + 2452570.509 * ws - 11379255.99;
    case 9 < ws && ws < 10:
      return -268000 * ws * ws + 5516000 * ws - 24833000;
    case 10 <= ws && ws < 11:
      return -52000 * ws * ws + 1164000 * ws - 2955000;
    case 11 <= ws && ws < 19.5:
      return 3600000;
    case 19.5 <= ws && ws < 20.499:
      return 3544000;
    case 20.499 <= ws && ws < 21.499:
      return 3400000;
    case 21.499 <= ws && ws < 22.499:
      return 2354000;
    case ws < 23.499:
      return 2050000;
    case ws < 25.01:
      return 1280000;
    default:
      return 0;
  }
};

const windPower3_8 = (ws) => {
  switch (true) {
    case ws < 2.75:
      return 0;
    case 2.75 <= ws && ws < 4:
      return 38594.4795 * ws * ws + -91774.18866 * ws + -6930.505107 - 10000;
    case 4 <= ws && ws < 5:
      return 50328.66804 * ws * ws + -179633.9254 * ws + 156761.425;
    case 5 <= ws && ws < 6:
      return 70574.72694 * ws * ws + -368403.0998 * ws + 594455.8249;
    case 6 <= ws && ws < 7:
      return 99800.19027 * ws * ws + -725397.4515 * ws + 1684305.255;
    case 7 <= ws && ws < 8:
      return 101486.9799 * ws * ws + -775460.2669 * ws + 1952092.272;
    case 8 <= ws && ws < 9:
      return -71170.6037 * ws * ws + 2080595.387 * ws - 9846267.613;
    case 9 <= ws && ws < 10:
      return -270913.0779 * ws * ws + 5700010.426 * ws - 26241862.55;
    case 10 <= ws && ws < 11:
      return -232547.8914 * ws * ws + 5010571.8 * ws - 23183994.94;
    case 11 <= ws && ws < 12:
      return -12000 * ws * ws + 282000 * ws + 2100000;
    case 12 <= ws && ws < 19.5:
      return 3800000;
    case 19.5 <= ws && ws < 20.499:
      return 3744000;
    case 20.499 <= ws && ws < 21.499:
      return 3500000;
    case 21.499 <= ws && ws < 22.499:
      return 2754000;
    case ws < 23.499:
      return 2250000;
    case ws < 25.01:
      return 1680000;
    default:
      return 0;
  }
};

//Tính công suất gió theo 2 loại máy
const powerWind = (num3_6, num3_8, ws) => {
  return (num3_6 * windPower3_6(ws) + num3_8 * windPower3_8(ws)) / 1000000;
};

// Tính công suất dự đoán
const powerForescast = (pAPI, deviation) => {
  return pAPI + pAPI * deviation;
};

const caculatorWindSpeed = (wind_u, wind_v) => {
  const result = Math.sqrt(Math.pow(wind_u, 2) + Math.pow(wind_v, 2));
  return result;
};

module.exports = {
  windPower3_6,
  windPower3_8,
  powerForescast,
  powerWind,
  caculatorWindSpeed,
};
