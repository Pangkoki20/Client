let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let cors = require('cors');
let router = express.Router();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let hobby = {
    list: [
        { id: 1, name: "Koki", age: 23, sex: "Female", hobby: "Listen to music" },
        { id: 2, name: "Boy", age: 23, sex: "Male", hobby: "Sing and play guitar" },
    ],
};

router.route('/hobby')
    .get((req, res) => { res.json(hobby) })

    .post((req, res) => {
        console.log("Show hobby =", req.body)
        let id = (hobby.list.length) ? hobby.list[hobby.list.length - 1].id + 1 : 1
        let name = req.body.name
        let age = req.body.age
        let sex = req.body.sex
        let hobby = req.body.hobby
        hobby = { "list": [...hobby.list, { id, name, age, sex, hobby }] }
        console.log("Hobby list =", hobby.list)
        res.json(hobby.list)
    })
router.route('/hobby/:hobby_id')
    .get((req, res) => {
        const hobby_id = req.params.hobby_id
        const id = hobby.list.findIndex(item => +item.id === +hobby_id)
        if (id < 0) {
            res.send('Not found')
        }
        else {
            res.json(hobby.list[id])
        }
    })
    .put((req, res) => {
        const hobby_id = req.params.hobby_id
        const id = hobby.list.findIndex(item => +item.id === +hobby_id)
        if (id < 0) {
            res.send('Not found')
        }
        else {
            hobby.list[id].name = req.body.name
            hobby.list[id].age = req.body.age
            hobby.list[id].sex = req.body.sex
            hobby.list[id].hobby = req.body.hobby
            res.json(hobby.list[id])
        }
    })
    .delete((req, res) => {
        const hobby_id = req.params.hobby_id
        const id = hobby.list = hobby.list.filter(item => +item.id !== +hobby_id)
        if (id < 0) {
            res.send('Not found')
        }
        else {
            res.json(hobby.list)
        }
    })
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8080, () => console.log(`Server is running ..... `));