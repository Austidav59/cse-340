const utilities = require("../utilities")
const classificationModel = require("../models/newClassification-Model")
const vehicleModel = require("../models/newVehicle-model")



/* ****************************************
*  Deliver management view
* *************************************** */
async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    req.flash("notice", "This is a flash message.")
    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,

    })
}

async function addNewClassifacation(req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("inventory/newClassifacation", {
    title: "Add New Classification",
    nav,

  })
}

async function addNewVehicle(req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("inventory/newVehicle", {
    title: "Add New Vehicle",
    nav,

  })
}

/* ****************************************
*  Process Clasification
* *************************************** */
async function processNewClassification(req, res) {
  let nav = await utilities.getNav()
  const { new_classification} = req.body
  const regResult = await classificationModel.newClassifacation(
    new_classification,
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you add your new classification`
    )
    res.status(201).render("/inv/newClassifacation", {
      title: "",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, your classification failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}


/* ****************************************
*  Process vehicle
* *************************************** */
async function processNewVehicle(req, res) {
  let nav = await utilities.getNav()
  const { new_classification} = req.body
  const regResult = await vehicleModel.newvehicle(
    new_classification,
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you add your new classification`
    )
    res.status(201).render("/inv/newClassifacation", {
      title: "",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, your classification failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

module.exports = {buildManagement, addNewClassifacation, addNewVehicle, processNewClassification, processNewVehicle}