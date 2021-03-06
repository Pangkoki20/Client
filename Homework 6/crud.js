let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let dogs = {
    list: [
        { "id": "1", "Name": "Bie", "Species": "Beagle", "Age": 3, "Price": 25000, "Weight": 20, "Hight": 13 },
        { "id": "2", "Name": "Boo", "Species": "Bulldog", "Age": 1, "Price": 5000, "Weight": 8, "Hight": 5 }]
}

router.route('/dogs')
    .get((req, res) => res.json(dogs))
    .post((req, res) => {
        // let id = (dogs.list.length) ? dogs.list[dogs.list.length - 1].id + 1 : 1
        let id = req.body.id
        let Name = req.body.Name;
        let Species = req.body.Species;
        let Age = req.body.Age;
        let Price = req.body.Price;
        let Weight = req.body.Weight;
        let Hight = req.body.Hight;
        dogs = { list: [...dogs.list, { id, Name, Species, Age, Price, Weight, Hight }] }
        res.json(dogs.list)

    })


router.route('/dogs/:dog_id')
    .get((req, res) => {
        let id = dogs.list.findIndex(
            (item) => (item.id === req.params.dog_id))
        if (id === -1) {
            res.send('Not found')
        }

        res.json(dogs.list[id])
    })

    .put((req, res) => {
        let id = dogs.list.findIndex((item) => (
            item.id === req.params.dog_id
        ))
        if (id === -1) {
            res.send('Not found')
        }
        dogs.list[id].Name = req.body.Name
        dogs.list[id].Species = req.body.Species
        dogs.list[id].Age = req.body.Age
        dogs.list[id].Price = req.body.Price
        dogs.list[id].Hight = req.body.Hight
        dogs.list[id].Weight = req.body.Weight
        res.json(dogs.list)
    })

    .delete((req, res) => {

        dogs = dogs.list.filter(item => item.id !== req.params.dog_id)
        res.json(dogs.list)
        if (id === -1) {
            res.send('Not found')
        }
    })

app.listen(8080, () => console.log('server is running...'))