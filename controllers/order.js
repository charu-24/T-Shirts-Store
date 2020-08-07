const { Order, ProductCart} = require("../models/order")

exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No Order Found In DB"
            })
        }
        req.order = order
        next()
    })
}

//create order
exports.createOrder = (req, res) => {
    req.body.order.user= req.profile
    const order = new Order
    order.save((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "Not able create Order"
            })
        }
        res.json(order)
    })
}

//get all orders
exports.getAllOrders = (req, res) =>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No order found"
            })
        }

        res.json(order)
    })


}

//status

exports.updateStatus = (req, res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set : {status: req.body.status}},
        (err, order) =>{
            if(err) {
                return res.status(400).json({
                    error: "Not able get Order status"
                })
            }
            res.json(order)
        }
    )
}

exports.getOrderStatus = (req, res) =>{
    res.json(Orde.schema.path("status").enumValues)
}