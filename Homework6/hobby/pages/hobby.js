import React, { useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const URL = `http://localhost/api/hobbys`
const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {

    const [hobby, sethobby] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>

    const printhobbys = (hobbys) => {
        console.log('hobbys:', hobbys)
        if (hobbys && hobbys.length)
            return (hobbys.map((hobby, index) =>
            (<li key={index}>
                Name: {(hobby) ? hobby.name : '-'}  SurName: {(hobby) ? hobby.surname : '-'} Major: {(hobby) ? hobby.major : '-'} GPA: {(hobby) ? hobby.GPA : 0}
                <button onClick={() => deletehobby(hobby.id)}> Delete </button>
                <button onClick={() => gethobby(hobby.id)}>Get</button>
                <button onClick={() => updatehobby(hobby.id)}>Update</button>
            </li>)
            ))
        else {
            return (<h2>No hobbys</h2>)
        }
    }

    const gethobby = async (id) => {
        const result = await axios.get(`${URL}/${id}`)
        console.log('hobby id: ', result.data)
        sethobby(result.data)
    }

    const addhobby = async (name, surname, major, GPA) => {
        const result = await axios.post(URL, { name, surname, major, GPA })
        console.log(result.data)
        mutate(URL)
    }

    const deletehobby = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        mutate(URL)
    }
    const updatehobby = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            name,
            surname,
            major,
            GPA
        })
        console.log('hobby id update: ', result.data)
        mutate(URL)
    }

    return (<div>
        <h1> hobby </h1>
        <ul>{printhobbys(data.list)}</ul>

       selected hobby: {hobby.name} {hobby.surname} {hobby.major} {hobby.GPA}
        <h2>Add hobby</h2>
          Name:<input type="text" onChange={(e) => setName(e.target.value)} /><br />
          SurName:<input type="text" onChange={(e) => setSurname(e.target.value)} /><br />
          Major:<input type="text" onChange={(e) => setMajor(e.target.value)} /><br />
          GPA:<input type="number" onChange={(e) => setGPA(e.target.value)} /> <br />
        <button onClick={() => addhobby(name, surname, major, GPA)}>Add new hobby</button>

    </div>)
}

export default SWR1