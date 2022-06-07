import express, {Application, Request, Response,NextFunction} from 'express';
import cors from 'cors';
import {creditRoute} from "./ruotes/creditRoute";

const app: Application = express()
const port: Number = 5001;

//Middlewares...
app.use(cors())
app.use(express.json());

//Routes...
app.use("/Credit", creditRoute)


app.listen(port, ()=>{
    console.log( `Connected successfuly on port ${port}`)
})