const express = require('express');
const bodyParser = require('body-parser');
const { resolveAny } = require('dns');
const app = express();
let cors = require('cors');
app.use(cors());
const router = express.Router();
const PORT = 8002;

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let dogs = {
    list:
        [
            { "id": "5935512012", "name": "boo", "species": "Beagle", "age": 2, "price": 10000 },
            { "id": "5935512013", "name": "reace", "species": "Bulldog", "age": 1.5, "price": 15000 }
        ]
}


router.route('/dogs')
    .get((req, res) => res.json(dogs))
    .post((req, res) => {
        console.log(req.body)
        //let id = (dogs.list.length)? dogs.list[dogs.list.length-1].id+1:1
        let newDog = {}
        newDog.id = (dogs.list.length) ? dogs.list[dogs.list.length - 1].id + 1 : 1
        newDog.name = req.body.name
        newDog.species = req.body.species
        newDog.age = req.body.age
        newDog.price = req.body.price
        dogs = { list: [...dogs.list, newDog] }
        res.json(dogs)
    })

router.route('/dogs/:dog_id') //params
    .get((req, res) => {
        let id = dogs.list.findIndex((item) => (+item.id === +req.params.dog_id))

        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(dogs.list[id])
        }


    })
    .put((req, res) => {
        let id = dogs.list.findIndex((item) => (+item.id === +req.params.dog_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            dogs.list[id].name = req.body.name
            dogs.list[id].species = req.body.species
            dogs.list[id].age = req.body.age
            dogs.list[id].price = req.body.price
            res.json(dogs)
        }


    })
    .delete((req, res) => {

        let id = dogs.list.findIndex((item) => (+item.id === +req.params.dog_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            dogs.list = dogs.list.filter((item) => +item.id !== +req.params.dog_id)
            res.json(dogs)
        }
    })

app.listen(PORT, () => console.log('Server is running at', PORT));