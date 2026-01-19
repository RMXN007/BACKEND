console.log("HELLO FROM BACKEND");

const express = require('express')
const app = express()
const port = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/jokes',(req,res)=>{
    const gitData=[
        {
            id:"1",
            tittle:"Funny",
            content:"super Funny"
        },
    ]
    res.send(gitData);
})

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`)
})