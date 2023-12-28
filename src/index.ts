import { Request, Response, Express } from "express";
import express from "express";
const app:Express = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

type User = {
    username : string
    password : string
}
const USERS : User[] = [
    {
        "username" : "amine",
        "password" : "tebini"
    },
    {
        "username" : "messi",
        "password" : "leo"
    }
]


app.post('/sign-up',async(req:Request, res:Response) => {
    const {username, password} = req.body   
    const filtred : User[]  = USERS.filter(user => user.username === username )
    if(filtred.length > 0){
        res.status(409).send({message :"username is already taken"})
    } else if(password.length < 6){
        res.status(400).send({message :"password must be at least 6 characters"})
    } else {
        USERS.push({username, password})
        res.status(201).send({message:"successful registration"})
    }
} )

app.post("/sign-in",async(req:Request, res:Response) => { 
    const {username, password}: User = req.body
    const filtred : User[] = USERS.filter(user => user.username === username  )
    if(filtred.length === 0){
        res.status(404).send({message : "user does not exist"})
    } else if(filtred[0].password !== password){ 
        res.status(401).send({message: " incorrect credentials"})
    } else {
        res.status(200).send({message: "successful authentication"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})