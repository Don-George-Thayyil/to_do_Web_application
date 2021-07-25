const express = require('express');
const router = express.Router()
const taskHelper = require("../helpers/task-helpers")
// const mongo = require('mongodb').MongoClient

router.get('/', (req, res, next)=>{
    res.render('create')
});
router.post('/submit', (req, res, next)=>{

    taskHelper.addTask(req.body,(result)=>{
        res.redirect('/user/getTaskList')
    })

//     mongo.connect("mongodb://localhost:27017", (err, client)=>{
//         if (err){
//             res.send("Encountered error")
//         }
//         else{
//             client.db("Todo_db").collection("tasks").insertOne(req.body)
//             res.send("Ok...!!!")
//         }
    // })
});

module.exports = router;