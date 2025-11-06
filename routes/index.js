var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model')
const brcypt = require('bcrypt');
const { token } = require('morgan');
const jwt =  require('jsonwebtoken');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await userSchema.find({})
  res.send(users);
});

/* REGISTER users listing. */
router.post('/register', async function(req, res, next) {

  let { ids, password } = req.body

  let user = new userSchema({
    ids,
    password : brcypt.hashSync(password, 10)
  })

  await user.save()

  res.send("Insert Successfully");
});

/* LOGIN users listing. */
router.post('/login', async function(req, res, next) {

  let { ids, password } = req.body
  let user = await userSchema.findOne({ids})

  if(!user){
    return res.status(404).send("User not found")
  } 

  let isPasswordValid = brcypt.compareSync(password, user.password) 

  if(!isPasswordValid){
    return  res.status(401).send("Invalid Password")
  }
  const token = jwt.sign({ ids: user.ids, role: user.role }, '123', { expiresIn: '1h' });

  res.send(token);
});

// /* PUT users listing. */
// router.put('/:id', async function(req, res, next) {

//     let { id } = req.params
//     let { ids, password } = req.body

//     let user = await userSchema.findByIdAndUpdate(id, {ids,password}, { new: true })
//     res.send(user);
  
// });

/* DELETE users listing. */
router.delete('/:id', async function(req, res, next) {

    let { id } = req.params
    let { ids, password } = req.body

    let user = await userSchema.findByIdAndDelete(id)
    res.send(user);
  
});

module.exports = router;
