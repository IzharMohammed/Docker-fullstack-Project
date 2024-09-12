import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/test', (req, res) => {
    try {
        res.status(200).json({ msg: "Api working" })
    } catch (error) {
        res.status(500).json({ msg: "Some error in api" })
    }

})


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json( users )
})




app.listen(3000, () => {
    console.log('server is up!!!');
})