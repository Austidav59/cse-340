// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const manageController = require("../controllers/manageController");
const utilities = require("../utilities")




// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by classification view
router.get("/detail/:invId", invController.buildByInvId);

router.get("/", utilities.handleErrors(manageController.buildManagement))
module.exports = router;