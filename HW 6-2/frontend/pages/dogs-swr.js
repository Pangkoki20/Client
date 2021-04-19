import React, { useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

const URL = `http://localhost:8002/api/dogs`
const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {


    const [student, setDog] = useState('')
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [age, setAge] = useState('')
    const [price, setPrice] = useState(0)


    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>



    const printDogs = (dogs) => {
        console.log('Dogs:', dogs)
        if (dogs && dogs.length)
            return (dogs.map((student, index) =>
            (<li key={index}>
                {(student) ? student.name : '-'} : {(student) ? student.species : '-'} : {(student) ? student.age : '-'} : {(student) ? student.price : '-'}
                <button onClick={() => deleteDog(student.id)}> Delete </button>
                <button onClick={() => getDog(student.id)}>Get</button>
                <button onClick={() => updateDog(student.id)}>Update</button>
            </li>)
            ))
        else {
            return (<h2>No dogs</h2>)
        }
    }

    const getDog = async (id) => {
        const result = await axios.get(`${URL}/${id}`)
        console.log('Dog id: ', result.data)
        setDog(result.data)
    }

    const addDog = async (name, species, age, price) => {
        const result = await axios.post(URL, { name, species, age, price })
        console.log(result.data)
        mutate(URL)
    }

    const deleteDog = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        mutate(URL)
    }
    const updateDog = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            name,
            species,
            age,
            price
        })
        console.log('student id update: ', result.data)
        mutate(URL)
    }

    return (<div>
        <h1> Dogs </h1>
        <ul>{printDogs(data.list)}</ul>

       selected student : {student.name} {student.species} {student.age} {student.price}
        <h2>Add student</h2>
          Name:<input type="text" onChange={(e) => setName(e.target.value)} /><br />
          Surname:<input type="text" onChange={(e) => setSpecies(e.target.value)} /> <br />
          Major:<input type="text" onChange={(e) => setAge(e.target.value)} /> <br />
          price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
        <button onClick={() => addDog(name, species, age, price)}>Add new student</button>

    </div>)
}

export default SWR1