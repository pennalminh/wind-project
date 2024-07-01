"use strict";
const {
  exportExcel96Period,
  exportExcel48Period,
} = require("../controllers/exportExcelController");
const { Router } = require("express");

const router = Router();

router.post("/export-csv-in-next-day", async function (req, res) {
  try {
    exportExcel96Period();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json("oke");
});

router.post("/export-csv-in-next-2-day", async function (req, res) {
  try {
    exportExcel48Period();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json("oke");
});

module.exports = router;
