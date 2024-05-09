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


module.exports = invCont;