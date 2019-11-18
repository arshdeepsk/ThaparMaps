const express=require('express');
const router = express.Router();

const config = {
    client: "pg",
    connection: {
      host: "ec2-174-129-253-140.compute-1.amazonaws.com",
      user: "dyxpwahyzsghdp",
      password:
        "4652aff73821f53e0f7b002a179c5b3faa37de6d51f830070b887c2305bed844",
      database: "dbiofg5h1gdnte",
      ssl: "true",
      charset: "utf8"
    }
  };
var knex = require("knex")(config);
var bookshelf = require("bookshelf")(knex);

var User = bookshelf.Model.extend({
  tableName: "user",
  requireFetch: false
});
var Navigate = bookshelf.Model.extend({
  tableName: "navigate",
  requireFetch: false
});

router.post('/login',async function(req,res){
    console.log(req.body.email);

    User.where("email", req.body.email).fetch().then((r)=>{
        if(r===null)
         return res.send("");
        if (r.attributes.password === req.body.password) {
          res.send(r.attributes.type);
        } 
    }).catch((err)=>{
        console.error(err);
    });
});

router.post("/location", async (req, res) => {
    const navigate = await Navigate.where("roomNo", req.body.roomNo).fetch();
    console.log(navigate);
    res.send(navigate);
  });
  
module.exports = router;