const dailyController = require("../Controllers/dailyController");

const router = require("express").Router();

//router.delete("/:horoYearId", yearlyContoller.deletePublication);
router.post("/", dailyController.addDaily);
router.get("/:date", dailyController.getDailyHoroscope);
router.get("/:language", dailyController.getAllDailyHoroscopes);

module.exports = router;
