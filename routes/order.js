const express= require('express')
const router = express.Router()


const { getUserById, userPurchaseList} = require('../controllers/user')

const {
    isSignedIn,
     isAdmin, 
     isAuthenticated
    } = require('../controllers/auth')

const { updateStock } = require('../controllers/product')

const {getOrderById , createOrder, getAllOrders, updateStatus, getOrderStatus} = require("../controllers/order")

//params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//create order
router.post('/order/create/:userId', isSignedIn, isAuthenticated, userPurchaseList, updateStock, createOrder,)

// get all orders
router.get("order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//get status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.get("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router