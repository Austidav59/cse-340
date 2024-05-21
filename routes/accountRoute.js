// Needed Resources 
const express = require("express")
const router = new express.Router() 
const actController = require("../controllers/accountCountroller");
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


// LOGIN VIEW
router.get("/login", utilities.handleErrors(actController.buildLogin))


// REGISTRATION VIEW
router.get("/register", utilities.handleErrors(actController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(actController.registerAccount)
)

router.post(
  "/login",
  //regValidate.loginRules(),
  //regValidate.checkLoginData,
  utilities.handleErrors(actController.accountLogin)
)
router.get("/", utilities.handleErrors(actController.buildAccountManagementView))

module.exports = router;