"use strict";

const {
  exportPowerForeCastByPeriodInDay,
  exportPowerForeCastByPeriodIn2Day,
} = require("../actions");
const { writeExcelWithTemplate } = require("../actions/writeExcel");

const exportExcel96Period = async (req, res) => {
  try {
    const arrP = await exportPowerForeCastByPeriodInDay(96);
    writeExcelWithTemplate(arrP);
  } catch (error) {
    return error;
  }
};

const exportExcel48Period = async (req, res) => {
  try {
    const arrP = await exportPowerForeCastByPeriodIn2Day(48);
    writeExcelWithTemplate(arrP);
  } catch (error) {
    return error;
  }
};

module.exports = {
  exportExcel96Period,
  exportExcel48Period,
};
