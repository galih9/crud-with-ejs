const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('express') // whatever your database name is
})
app.set('view engine', 'ejs')

app.listen(3000, function () {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    // res.send('Hello World')
    db.collection('todo').find().toArray((err, result) => {
        if (err) return console.log(err)
        // res.json(result);

        res.render('index.ejs', { todos: result })
    })
})

app.post('/todos', (req, res) => {
    db.collection('todo').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        // console.log('saved to database', req)
        // res.json(req.body);

        res.redirect('/')
    })
})

app.get('/todos/:id', (req, res) => {
    let _id = new ObjectId(req.params.id)
    db.collection('todo').deleteOne({ "_id": _id }, (err, result) => {
        if (err) return console.log(err)
        // console.log(req.params);
        // res.json("deleted")

        res.redirect('/')
    })
})

app.post('/todo/:id', (req, res) => {
    let _id = new ObjectId(req.params.id)
    db.collection('todo').replaceOne({ "_id": _id }, req.body, (err, result) => {
        if (err) return console.log(err)
        // res.json(req.body)

        res.redirect('/')
    })
})

app.get('/seed', (req, res) => {
    db.collection("todo").insertMany([
        { name: 'Basketball', description: 'Throwing into a basket.' },
        { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
        { name: 'Weightlifting', description: 'Lifting heavy things up' },
        { name: 'Ping Pong', description: 'Super fast paddles' }
    ], (err, result) => {
        if (err) return console.log(err)

        // seeded!
        // res.json(result);
        res.redirect('/');
    })


})