const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by inventory_id view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId

  let nav = await utilities.getNav()
  const data = await invModel.buildByInvId(inv_id);
  const vehicleName = data[0].inv_year+ " " + data[0].inv_make + " " + data[0].inv_model;
  const grid = await utilities.buildVehicleGrid(data)

  res.render("./inventory/detail", {
    title: vehicleName,
    nav,
    grid
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ****************************************
*  Deliver management view
* *************************************** */
invCont.buildInvMangementView = async (req, res, next) => {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/invDisplay", {
    title: "Manage Inventory",
    nav,
    errors: null,
    classificationSelect
  })
}


module.exports = invCont;