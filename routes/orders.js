var express = require('express');
var router = express.Router();
var userSchema = require('../models/orders.model')
const brcypt = require('bcrypt');
const { token } = require('morgan');
const jwt =  require('jsonwebtoken');

/* GET orders listing. */
router.get('/', async function(req, res, next) {
  let orders = await userSchema.find({})
  res.send(orders);
});

/* GET products:id listing. */
router.get('/:id', async function(req, res, next) {
    let { id } = req.params
    let product = await userSchema.findById(id)
    res.send(product);
});

/* POST orders listing. */
router.post('/:id/orders', async function(req, res, next) {

  let { user_id, product_id, price, stock } = req.body

  let order = new userSchema({
    user_id,
    product_id,
    price,
    stock
    
  })

  await order.save()

  res.send("Insert Successfully");
});



// /* PUT products listing. */
// router.put('/:id', async function(req, res, next) {

//     let { id } = req.params
//     let { name, price, stock } = req.body

//     let product = await userSchema.findByIdAndUpdate(id, {name,price,stock}, { new: true })
//     res.send(product);
  
// });

// /* DELETE products listing. */
// router.delete('/:id', async function(req, res, next) {

//     let { id } = req.params
//     let { name, price, stock } = req.body

//     let product = await userSchema.findByIdAndDelete(id)
//     res.send(product);
// })       

module.exports = router;
