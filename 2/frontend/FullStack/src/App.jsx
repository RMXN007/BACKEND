// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jokes,setJokes]=useState([]);

  useEffect(()=>{
    axios.get("/api/jokes")
    .then((response)=>{
      setJokes(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])

  return (
    <>
      <h1>CHAI AUR CODE FRONTEND</h1>
      <h2>Jokes:{jokes.length}</h2>

      {
        jokes.map((joke,index)=>(
          <div key={joke.id}>
            <h2>{joke.tittle}</h2>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
