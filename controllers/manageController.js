const utilities = require("../utilities")

/* ****************************************
*  Deliver login view
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


module.exports = {buildManagement, addNewClassifacation, addNewVehicle}