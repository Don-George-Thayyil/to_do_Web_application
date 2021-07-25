var express = require('express');
var router = express.Router();
var taskHelper = require('../helpers/task-helpers')


router.get('/', function(req, res, next) {
    console.log("okay")
    taskHelper.get_count().then((data) => {
        let c0 = data[0]
        let c1 = data[1]
        let c2 = data[2]
        let c3 = data[3]
        res.render('count', {c0, c1, c2, c3});
      })    
});

module.exports = router;
