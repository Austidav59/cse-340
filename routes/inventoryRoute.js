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

// New Classification
router.get("/newClassifacation", utilities.handleErrors(manageController.addNewClassifacation))
// New Vehivle
router.get("/newVehicle", utilities.handleErrors(manageController.addNewVehicle))
// post new classification
router.post("/newClassifacation",  utilities.handleErrors(manageController.processNewClassification))
// post new vehicle
router.post("/newVehicle",  utilities.handleErrors(manageController.processNewVehicle))


module.exports = router;