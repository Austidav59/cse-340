// Needed Resources 
const express = require("express")
const router = new express.Router() 
const manageController = require("../controllers/manageController");
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


// LOGIN VIEW
router.get("/inv", utilities.handleErrors(manageController.buildManagement))

module.exports = router;