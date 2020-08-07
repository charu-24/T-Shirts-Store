const express = require("express")
const { check, validationResult } = require("express-validator");
const  {name} = require("../models/category")
const router = express.Router() 


const { 
    getCategoryById,
    createCategory, 
    getAllCategory ,
    getCategory, 
    updateCategory,
    removeCategory 
} = require('../controllers/category')

const { getUserById} = require('../controllers/user')

const {
    isSignedIn,
     isAdmin, 
     isAuthenticated
    } = require('../controllers/auth')

//params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)


//actual routes
router.post("/category/create/:userId",  [check("name", "Please fill up the field").isLength({min:5})], isSignedIn, isAuthenticated, isAdmin, createCategory )
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

//update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated , isAdmin, updateCategory)

//delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated ,isAdmin, removeCategory)


module.exports = router