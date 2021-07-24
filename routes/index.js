var express = require('express');
var router = express.Router();
// const mongo = require('mongodb').MongoClient;
var taskHelper = require('../helpers/task-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  taskHelper.getTasks().then((data) => {
    let nontasks = data[0]
    let intasks = data[1]
    let comtasks = data[2]
    let count = data[3]
    let c1 = data[4]
    let c2 = data[5]
    let c3 = data[6]
    // console.log(data)
    res.render('index', { nontasks, intasks, comtasks, count, c1, c2, c3});
    // console.log(count)
  })
})


router.get('/delete/', (req, res) => {
  let taskId = req.query.id
  let completion = req.query.comp
  // console.log(completion)
  taskHelper.deleteTasks(taskId, completion).then((response) => {
    res.redirect('/');
  })
})

router.get('/edit/', async (req, res) => {
  let taskId = req.query.id
  let completion = req.query.comp
  console.log(taskId, completion)
  await taskHelper.getProductDetails(taskId, completion).then((data) => {
    res.render('edit', { data });
    // console.log(data)
  })
})

router.post('/edit/', (req, res) => {
  let taskId = req.query.id;
  let completion = req.query.comp;
  let data = req.body;
  // console.log(completion)
  if (completion == data.completion) {
    console.log(completion, data.completion)
    taskHelper.editTasks(taskId, completion, data).then(() => {
      res.redirect('/')
    })
  }
  else {
    // console.log("baaaaad!!!!")
    taskHelper.addTask(data, () => {
      taskHelper.deleteTasks(taskId, completion).then(() => {
        res.redirect('/')
      })
    })
  }

})



module.exports = router;
