const express=require('express');
const router = express.Router();

router.post('/login',function(req,res){
    console.log(req.body.email);

    // const user = await User.where("email", req.body.email).fetch();
    // if(user===null)
    // return res.send({});
    // if (user.attributes.password === req.body.password) {
    //   res.send(user);
    // }
    res.send({});
});

module.exports = router;