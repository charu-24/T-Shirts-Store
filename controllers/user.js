const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=> {
        if(err || !user){
            return res.status(400).json({
                error : "No user found in DB"
            })
        }
        req.profile = user
        next()
    } )
}

exports.getUser = (req, res) => {
    req.profile.encry_password = undefined
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You cannot updatethe things.."
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.send(user)
        }
    )
}

exports. userPurchaseList =(req, res) =>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error : "No order in this account"
            })
        }
        return res.json(order)
    })
}