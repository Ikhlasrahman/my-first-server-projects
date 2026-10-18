import express from 'express'

const app = express()
const port = process.env.port || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about',(req,res)=>{
    res.send('about page')
})

app.get('/contact',(req,res)=>{
    res.send('contact page')
})

const users = [
    {id:1, name:'john Doe',email:'john@gmail.com'},
    {id:2, name:'johnMon Doe',email:'johnmon@gmail.com'},
    {id:3, name:'Don Doe',email:'don@gmail.com'},
    {id:4, name:'Lawn Doe',email:'lawn@gmail.com'},
]
app.get('/users',(req,res)=>{
    res.send(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})