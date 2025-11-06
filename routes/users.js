var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await userSchema.find({})
  res.send(users);
});

// /* POST users listing. */
// router.post('/register', async function(req, res, next) {

//   let { ids, password } = req.body

//   let user = new userSchema({
//     ids,
//     password
//   })

//   await user.save()

//   res.send("Insert Successfully");
// });

/* Approve users listing. */
router.put('/:id', async function(req, res, next) {

    let { id } = req.params
    let { ids, password } = req.body

    let user = await userSchema.findByIdAndUpdate(id, {ids,password,approvestatus: true}, { new: true })
    res.send(user);
  
});

// /* DELETE users listing. */
// router.delete('/:id', async function(req, res, next) {

//     let { id } = req.params
//     let { ids, password } = req.body

//     let user = await userSchema.findByIdAndDelete(id)
//     res.send(user);
  
// });

module.exports = router;
