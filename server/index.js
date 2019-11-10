var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

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
  tableName: "user"
});
var Navigate = bookshelf.Model.extend({
  tableName: "navigate"
});

app.get("/api/login",async(req,res)=>{
    const user = await User.where("email", req.body.email).fetch()
    if(user==={}){
        res.send({});
    }
    if(user.password===req.body.password){
        res.send(user);
    }
    if(user.password!==req.body.password){
        res.send({});
    }
})

app.get('/api/location',async(req,res)=>{
    const navigate =await Navigate.where("roomNo",req.body.roomNo).fetch()
    res.send(navigate)
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
