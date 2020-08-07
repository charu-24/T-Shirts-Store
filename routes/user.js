const express = require('express')
const router = express.Router()

const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth')
const { getUserById, getUser, updateUser,  userPurchaseList } = require('../controllers/user')
const { Router } = require('express')

router.param('userId', getUserById)

router.get('/user/:userId',isSignedIn, isAuthenticated, getUser)
router.put('/user/:userId',isSignedIn, isAuthenticated, updateUser )
router.get('/user/order/:userId',isSignedIn, isAuthenticated, userPurchaseList )

module.exports = router