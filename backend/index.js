import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.json({
        msg: "successfull!!"
    })
})

app.listen(4000, () => {
    console.log('server is up!!!');

})