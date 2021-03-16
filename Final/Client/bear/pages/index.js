import {useEffect, useState} from 'react'
import axios from 'axios'
const URL = 'http://localhost/api/bears'
export default function Home(){

    const [bears, setBears] = useState(
{
   list: [
       { "id": 1, "name": "Winnie", "weight": 50 }]
})
    const [name,setName] = useState('')
    const [weight,setWeight] = useState(0)
    const [bear,setBear] = useState({})
    
    const getBear = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('bear id: ', result.data)
       setBear(result.data)
   }
    const getBears = async () => {
    let bears = await axios.get(URL)
}
    const printBears = () => {
        return bears.list.map((item,index) => {
            return (<li key={index}>{item.id}{item.name} : {item.weight}
            <button onClick={()=>getBear(item.id)}>Get</button>
            </li>)
        })
    }
    const addBear = async() => {
        let bears = await axios.post(URL,{name,weight})
        setBears(bears.data)
    }
    const updateBear = async (id) => {
       const result = await axios.put(`${URL}/${id}`,{name,weight})
       setBears(bears.data)
    }
    const deleteBear = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       setBears(bears.data)
   }


    useEffect(() => { getBears() }, [])
    return (
        <div> 
            <h2>Bear</h2>
            <ul>
                {printBears()}
            </ul>
            <h2>Add Bear</h2>
            Name : <input type = "text" onChange={(e) => setName(e.target.value)} /> <br/>
            Weight : <input type = "number" onChange={(e) => setWeight(e.target.value)} /> <br/>
            <button onClick={() => addBear()}>Add</button>
        </div>
    )

}