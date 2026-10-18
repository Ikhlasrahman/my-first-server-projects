import express from 'express'
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.post('/users',(req,res)=>{
    const { name, email } = req.body;
    const newUser = req.body;
    newUser.id=users.length;
    users.push(newUser);

    if (typeof name !== 'string' || typeof email !== 'string' || !name.trim() || !email.trim()) {
        return res.status(400).send({ success: false, message: 'Name and email are required.' });
    }

    const user = {
        id: Math.max(0, ...users.map(({ id }) => id)) + 1,
        name: name.trim(),
        email: email.trim(),
    };
    users.push(user);

    res.status(201).send({ success: true, message: 'User added successfully.', user });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})