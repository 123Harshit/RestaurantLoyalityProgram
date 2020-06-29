'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');
var mysql = require('mysql');

var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "harshit456",
		database: "visitor"
	});
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.post('/api/products', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});

app.post('/api/auth', (req,res) => {
  let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      // return the information including token as JSON
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed. admin not found.");
  }
});

app.post('/',(req, res) => {
  let data = {name: req.body.name, ID: req.body.ID, visiting_date: req.body.date , dishes_ordered: req.body.products};
  console.log(data);
  let sql = "INSERT INTO user SET ?";
  let query = con.query(sql, data,(err, results) => {
    if(err) throw err;
    console.log("Data Inserted");
  });
});  

app.post('/api/getCount',(req, res) => {
  let data = {name: req.body.name};
  console.log(data);
    let sql = "SELECT COUNT(*) AS tc FROM user WHERE name = ?";
  let query = con.query(sql, data.name ,(err, results) => {
    if(err) throw err;
    var counts = results[0].tc;
    console.log(counts);
    return res.json(counts); 
  });
});  

app.post('/api/getDate',(req, res) => {
  let data = {name: req.body.name};
  console.log(data);
    let sql = "SELECT visiting_date as first FROM user WHERE name = ?";
  let query = con.query(sql, data.name ,(err, results) => {
    if(err) throw err;
    var imp= results[0].first;
    return res.json(imp); 
  });
});  

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');