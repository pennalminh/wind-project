const exportExcel96Period = async (req, res) => {
  try {
    const arrP = await exportPowerForeCastByPeriodInDay(96);
    return;
  } catch (error) {
    return error;
  }
};
