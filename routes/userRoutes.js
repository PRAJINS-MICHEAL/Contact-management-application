const validateTokenhandler = require("../middleware/validateTokenHandler")

const express = require("express");

const router = express.Router();

const { register , login , current} = require("../controllers/userController")

router.route("/register").post(register);

router.route("/login").post(login);

router.get("/current" , validateTokenhandler , current)

module.exports = router;



