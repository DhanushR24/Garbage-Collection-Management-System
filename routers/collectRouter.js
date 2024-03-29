const { Router } = require("express");
const router = Router();

const collectController = require("../controllers/collectController");

router.get("/pickup", collectController.pickup_get);
router.post("/pickup/:id", collectController.pickup_post);
router.get("/track", collectController.track);
router.get("/adminPickup", collectController.track_get);
router.get("/updateCoordinates", collectController.updateCoordinates);
router.get("/getCoordinates", collectController.getCoordinates);

module.exports = router;
