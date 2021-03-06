var express = require('express');
var router = express.Router();
var low = require('lowdb')
const db = low('db.json')
var request = require('request');
/* GET home page. */
var bool = false;
var newestDisaster= "asd";

router.get('/check',function(req,res,next){
    if(bool){
        res.send({bool:bool, newestDisaster:newestDisaster});
    }else{
        res.send({bool:bool, newestDisaster:null});
    }
    bool=false;
});
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about',function(req,res,next){
  res.render('index');
})

router.get('/disasters',function(req,res,next){
  res.render('disaster');
})

router.get('/contact',function(req,res,next){
    res.render('contact');
});
router.post('/info', function(req, res, next) {

  var name = req.body.name;
  var phone = req.body.phone;
  var address = req.body.address;
  var email = req.body.email;
  var fb = req.body.fb;
  var city = req.body.city;
  db.defaults({ users: [], cities: [] , volunteers:[], donators:[]})
  .value()

  db.get('users')
  .push({ name: name, phone: phone,city:city, address: address, email: email, fb:fb})
  .value()

  db.get('cities')
  .push({name:city,people:[]})
  .value()

  res.render('thanks');
});


router.post('/moreInfo',function(req,res,next){
    
    var string = Object.keys(req.body)[0];
    console.log(string + " AD")
    console.log(string)
    var obj = JSON.parse(string)
    var donate = obj.job;
    var email = obj.email;
    console.log(email)
    var person = db.get('users')
    .find({email:email})
    .value();

    db.get('cities')
    .find({name:person['city']})
    .value()['people'].push({name:person['name'],donate:donate,address:person['address']})
    console.log(db.get('cities').find({name:person['city']}).value()['people'][0]);

    res.send("success");
});

router.post('/sendInfo',function(req,res,next){
    var string = req.body.toString();
    
    var obj = JSON.parse(string);
    var email = obj.email;
    console.log(email);
    var person = db.get('users')
    .find({email:email})
    .value();

    console.log(person)

     var job = db.get('cities')
    .find({name:person['city']})
    .value()['people'].find({name:person['name']})['donate']
 console.log(db.get('cities').find({name:city}).value()['people'][0].find({name:name})['donate'][0]);

    if( job=='volunteer'){
        res.send(db.get('cities').find({name:person['city']}).value())
    }else{
        res.send({job:null});
    }
});
module.exports = router;
