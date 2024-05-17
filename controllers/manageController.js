const utilities = require("../utilities")
const accountModel = require("../models/account-model")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    req.flash("notice", "This is a flash message.")
    res.render("inventory/management", {
      title: "Site Management",
      nav,

    })
  }


  module.exports = {buildManagement}