var db = require("../config/connection")
var objectId = require('mongodb').ObjectId

module.exports = {
    addTask: (task, callback) => {
        // console.log(task)
        if (task.completion == "notCompleted") {
            db.get().collection('notCompTask').insertOne(task).then((data) => {
                callback(true)
            })
        }
        else if (task.completion == "inProgress") {
            db.get().collection('inProTask').insertOne(task).then((data) => {
                callback(true)
            })
        }
        else {
            db.get().collection('completeTask').insertOne(task).then((data) => {
                callback(true)
            })
        }
    },
    getTasks: () => {
        return new Promise(async (resolve, reject) => {
            let nontasks = await db.get().collection('notCompTask').find().toArray()
            let intasks = await db.get().collection('inProTask').find().toArray()
            let comtasks = await db.get().collection('completeTask').find().toArray()

            let count1 = await db.get().collection('notCompTask').count()
            let count2 = await db.get().collection('inProTask').count()
            let count3 = await db.get().collection('completeTask').count()
            let count = count1+count2+count3;
            // console.log(count)
            let data = [nontasks, intasks, comtasks, count,count1,count2,count3]
            resolve(data)
        })
    },
    deleteTasks: (taskId, completion) => {
        return new Promise((resolve, reject) => {
            if (completion == "notCompleted") {
                db.get().collection('notCompTask').remove({ _id: objectId(taskId) }).then((response) => {
                    // console.log(response)
                    resolve(response)
                })
            }
            else if (completion == "inProgress") {
                db.get().collection('inProTask').remove({ _id: objectId(taskId) }).then((response) => {
                    resolve(response)
                })
            }
            else {
                db.get().collection('completeTask').remove({ _id: objectId(taskId) }).then((response) => {
                    // console.log(response)
                    resolve(response)
                })
            }
        })
    },
    editTasks: (id, completion, data) => {
        return new Promise((resolve, reject) => {
            if (completion == "notCompleted") {
                db.get().collection('notCompTask').updateOne({ _id: objectId(id) }, {$set:{ task: data.task, desc: data.desc}})
                    .then((response) => {
                        resolve(response)
                    })
            }
            else if (completion == "inProgress") {
                db.get().collection('inProTask').updateOne({ _id: objectId(id) }, {$set:{ task: data.task, desc: data.desc} })
                    .then((response) => {
                        resolve(response)
                    })
            }
            else {
                db.get().collection('completeTask').updateOne({ _id: objectId(id) }, {$set:{ task: data.task, desc: data.desc} })
                    .then((response) => {
                        resolve(response)
                    })
            }
        })
    },
    getProductDetails: (id, completion) => {
        return new Promise((resolve, reject) => {
            if (completion == "notCompleted") {
                db.get().collection('notCompTask').findOne({ _id: objectId(id) }).then((task) => {
                    resolve(task)
                    // console.log(task)
                })
            }
            else if (completion == "inProgress") {
                db.get().collection('inProTask').findOne({ _id: objectId(id) }).then((task) => {
                    resolve(task)
                })
            }
            else {
                db.get().collection('completeTask').findOne({ _id: objectId(id) }).then((task) => {
                    resolve(task)
                })
            }
        })
    }
}