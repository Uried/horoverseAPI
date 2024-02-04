const monthlyContoller = require("../Controllers/monthlyController");

const router = require("express").Router();

//router.delete("/:horoYearId", yearlyContoller.deletePublication);
router.post("/", monthlyContoller.addMonthly);
router.get("/:date", monthlyContoller.getMonthlyHoroscope);
router.get("/", monthlyContoller.getAllMontlyHoroscopes);

module.exports = router;
