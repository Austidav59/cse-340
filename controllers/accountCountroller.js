
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("account/login", {
    title: "Login",
    nav,

  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
async function editAccountInfo(req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  // const itemData = await invModel.getInventoryById(inv_id)
  // const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  // const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./account/editAccount", {
    title: "Edit Account",
    nav,
    // classificationSelect: classificationSelect,
    // errors: null,
    // inv_id: itemData.inv_id,
    // inv_make: itemData.inv_make,
    // inv_model: itemData.inv_model,
    // inv_year: itemData.inv_year,
    // inv_description: itemData.inv_description,
    // inv_image: itemData.inv_image,
    // inv_thumbnail: itemData.inv_thumbnail,
    // inv_price: itemData.inv_price,
    // inv_miles: itemData.inv_miles,
    // inv_color: itemData.inv_color,
    // classification_id: itemData.classification_id
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body
  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
  const regResult = await accountModel.registerAccount(account_firstname, account_lastname, account_email, hashedPassword)
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

/* ****************************************
*  Deliver logged in view
* *************************************** */
async function buildAccountManagementView(req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("account/accountManagement", {
    title: "Your Logged In",
    nav,

  })
}

/* ****************************************
*  Log out
* *************************************** */
async function accountLogout(req, res) {
  res.clearCookie("jwt")
  res.locals.loggedin = ''
  return res.redirect("/")
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
      console
    })
    return
  }
  try {

    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
      if (process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
        const authorized = true
      }
      return res.redirect("/account")
    }
  } catch (error) {
    return new Error('Access Forbidden')
  }
}

// send a boolean Authenticated value


module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  buildAccountManagementView,
  accountLogout,
  editAccountInfo
}