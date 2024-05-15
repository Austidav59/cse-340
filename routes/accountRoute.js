// Needed Resources 
const express = require("express")
const router = new express.Router() 
const actController = require("../controllers/accountCountroller");
const utilities = require("../utilities")


// Route to build inventory by classification view
router.get("/type/:classificationId", actController.buildLogin);
// Route to build inventory by classification view
router.get("/detail/:actId", actController.buildLogin);
router.get("/login", utilities.handleErrors(actController.buildLogin))

module.exports = router;