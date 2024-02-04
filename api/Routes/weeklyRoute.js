const weeklyController = require("../Controllers/weeklyController");

const router = require("express").Router();

//router.delete("/:horoYearId", yearlyContoller.deletePublication);
router.post("/", weeklyController.addWeekly);
router.get("/:date", weeklyController.getWeeklyHoroscope);
router.get("/", weeklyController.getAllWeeklyHoroscopes);

module.exports = router;
