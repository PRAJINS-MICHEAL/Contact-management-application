const express = require("express")

const router = express.Router();

const {getContact , createContact , getContactUsingId , deleteContact , updateContact} = require('../controllers/contactControllers')

const validateToken =require("../middleware/validateTokenHandler")

router.use(validateToken)

router.route("/").get(getContact)

router.route("/").post(createContact);

router.route("/:id").get(getContactUsingId);

router.route("/:id").delete(deleteContact);

router.route("/:id").put(updateContact);

module.exports=router;
