//import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected', () =>{
    console.log("Connected to DB //localhost:27017");
});

mongoose.connection.on('error', (err:any) =>{
    if(err){
        console.log('Error in DB connection: '+err);
    }
});

var Customer = require('./models/customer');
var Buyer = require('./models/buyer');


//port no
const port = 3000;

//adding middleware
app.use(cors());

//bpdy parser
app.use(bodyparser.json());

//static files
//app.use(express.static(path.join(__dirname, 'public')));

//testing server
app.get('/', (req:any, res:any) => {
    res.send('Start Page');
});

//DB routes

app.get('/customers', (req:any, res:any, next:any) => {
    Customer.find(function(err:any, customers:any){
        res.json(customers);
    })
});

app.post('/customer', (req:any, res:any, next:any) => {
    let newCustomer = new Customer({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        countryOfResidency: req.body.countryOfResidency,
        addline1: req.body.addline1,
        addline2: req.body.addline2,
        addline3: req.body.addline3,
        addline4: req.body.addline4,
        postalCode: req.body.postalCode,
        buildingNumber: req.body.buildingNumber,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress
    });

    newCustomer.save((err:any) => {
        if(err){
            res.json({msg: 'Failed to add customer'});
        }
        else{
            res.json({msg: 'Customer added succesfully'});
        }
    });
});

app.delete('/customer/:id', (req:any, res:any, next:any) => {
    Customer.deleteOne({_id: req.params.id}, function(err:any, result:any){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

app.get('/buyers', (req:any, res:any, next:any) => {
    Buyer.find(function(err:any, buyers: any){
        res.json(buyers);
    })
});

app.post('/buyer', (req:any, res:any, next:any) => {
    let newBuyer = new Buyer({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        countryOfResidency: req.body.countryOfResidency,
        addline1: req.body.addline1,
        addline2: req.body.addline2,
        addline3: req.body.addline3,
        addline4: req.body.addline4,
        postalCode: req.body.postalCode,
        buildingNumber: req.body.buildingNumber,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress
    });

    newBuyer.save((err:any) => {
        if(err){
            res.json({msg: 'Failed to add buyer'});
        }
        else{
            res.json({msg: 'Buyer added succesfully'});
        }
    });
});

app.delete('/buyer/:id', (req:any, res:any, next:any) => {
    Buyer.deleteOne({_id: req.params.id}, function(err:any, result:any){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

app.listen(port, () => {
    console.log("Server started at port: "+ port);
});