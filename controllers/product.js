const Product = require('../models/product')
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Problem is within the file check it and try again.."
            })
        }

        //destructuring the fields
        const { name, description, price, stock,count, photo, category} = fields
        if(!name || !description ||  !price || !stock ){
            return res.status(400).json({
                error: "All fields are required"
            })

        }

        let product = new Product(fields)

        if(files.photo){
            if(files.photo.size> 3000000){
                return res.status(400).json({
                    error: "File is too big!"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        console.log(product.photo)
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save the product in DB"
                })
            }
            res.json({product})
        })
    })
}

exports.getProduct = (req, res) => {
    console.log(req.product)
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.updateProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with the image"
            })
        }
    

        let product = req.product

        //update
        product = _.extend(product, fields)


        //handle file
        if(file.photo){
            if(file.photo.size> 3000000){
                return res.status(400).json({
                    error: "File is too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "updation failed"
                })
            }
            res.json({product})
        
    })
    })

    // product.save((err, updateProduct) => {
    //     if(err){
    //         return res.status(400).json({
    //             error: "Not able to save category in DB"
    //         })
    //     }  
    //     res.json(updateProduct)
    // })
}

exports.deleteProduct = (req, res) => {
    console.log("hey i am in delete product")
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Not able to Remove"
            })
        }  
        res.json({
            meessage:"deltion was a success", deletedProduct
        })
    })
}


//get all products
exports.getAllProduct = (req, res) =>{
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 8

    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req, res, next) =>{
    let myOperations = req.body.order.products.map(prod => {
        return{
            updateOne : {
                filter: {_id: prod._id},
                update : {$inc: { stock: -prod.count, sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, product) =>{
        if(err){
            return res.status(400).json({
                error: "Bulk Write Operation Failed"
            })
        }
        res.json(product)
    })
}

//getAllUniqueCategories

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No category FOund"
            })
        }
        res.json(category)
    })
}