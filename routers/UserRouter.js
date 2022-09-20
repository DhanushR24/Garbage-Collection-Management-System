const { Router } = require("express");
const router = Router();

const userController = require("../controllers/UserController");

router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.get("/login", userController.login_get);
router.post("/login", userController.login_post);

module.exports = router;
