const yearlyContoller = require("../Controllers/yearlyController");

const router = require("express").Router();


//router.delete("/:horoYearId", yearlyContoller.deletePublication);
router.post("/", yearlyContoller.addYearly);
router.get("/", yearlyContoller.getAllHoroYear);
router.get("/:date", yearlyContoller.getHoroscopeByYear);

module.exports = router;