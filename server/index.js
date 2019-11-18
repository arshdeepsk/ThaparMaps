var app = require("express")();
var bodyParser = require("body-parser");
var express = require('express')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var api=require('./routes/api.route');
app.use('/api',api);
app.use(express.static(__dirname+'..'));
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

app.get('/',(req,res)=>{
  res.sendFile('C:/Users/admin/Documents/github/ThaparMaps/index.html');
})

// app.post("/login", async (req, res) => {
//   console.log(req.body.email)

//   // const user = await User.where("email", req.body.email).fetch();
//   // if(user===null)
//   // return res.send({});
//   // if (user.attributes.password === req.body.password) {
//   //   res.send(user);
//   // }
//   res.send({});
// });

app.get("/api/location", async (req, res) => {
  const navigate = await Navigate.where("roomNo", req.body.roomNo).fetch();
  res.send(navigate);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
