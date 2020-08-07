const express= require('express')
const router = express.Router()


const { 
    getCategoryById,    
} = require('../controllers/category')

const { getUserById} = require('../controllers/user')

const { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProduct, getAllUniqueCategories} = require('../controllers/product')

const {
    isSignedIn,
     isAdmin, 
     isAuthenticated
    } = require('../controllers/auth')

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//create product
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//get
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//update
router.put('/product/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, updateProduct)

//delete
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)

//get all product
router.get('/products',
 getAllProduct)


//get distinct categories
router.get('/product/categories', getAllUniqueCategories)
module.exports = router