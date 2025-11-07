var express = require('express');
var router = express.Router();
var userSchema = require('../models/products.model')
var ordersSchema = require('../models/orders.model')
const brcypt = require('bcrypt');
const { token } = require('morgan');
const jwt =  require('jsonwebtoken');

/* GET products listing. */
router.get('/', async function(req, res, next) {
  let products = await userSchema.find({})
  res.send(products);
});

router.get('/:id', async function(req, res, next) {
  let { id } = req.params
  let product = await userSchema.findById(id)
  res.send(product);
});




/* POST products listing. */
router.post('/', async function(req, res, next) {

  let { name, price, stock } = req.body

  let product = new userSchema({
    name,
    price,
    stock
    
  })

  await product.save()

  res.send("Insert Successfully");
});

/* GET products:id listing. */
router.get('/:id/orders', async function(req, res, next) {
    let { id } = req.params
    let product = await userSchema.findById(id)
    res.send(product);

});

/* POST Order listing. */
router.post('/:id/orders', async function(req, res, next) {
    let { id } = req.params
    let { user_id, price, quantity } = req.body

    // onsole.log('object :>> ', req.body);

//   check product stock

    const product =  await userSchema.findById(id);
    if(!product){
        return res.status(404).send({
            status : 404 ,
            message : "Product not found" ,
            data : null
        })
    }
    if(product.stock < quantity){
        return res.status(400).send({
            status : 400 ,
            message : "Insufficient stock" ,
            data : null
        })
    }

    // reduce product stock
    product.stock = product.stock - quantity;
    await product.save();

    let order = new ordersSchema({
        user_id,
        product_id : id,
        price,
        quantity
        
    })

    await order.save()

//   res.send("Insert Successfully");

    return res.status(200).send({
        status : 200 ,
        message : "Insert Successfully" ,
        data : null
    })

});



/* PUT products listing. */
router.put('/:id', async function(req, res, next) {

    let { id } = req.params
    let { name, price, stock } = req.body

    let product = await userSchema.findByIdAndUpdate(id, {name,price,stock}, { new: true })
    res.send(product);
  
});

/* DELETE products listing. */
router.delete('/:id', async function(req, res, next) {

    let { id } = req.params
    let { name, price, stock } = req.body

    let product = await userSchema.findByIdAndDelete(id)
    res.send(product);
})       

module.exports = router;
