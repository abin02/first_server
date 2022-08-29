const { response } = require("express");
const express = require("express");

//initialization
const app = express();
//application wil now use json format for data
app.use(express.json());

const port = 8081;

const toDoList = ["Complete Node Byte", "Play Cricket"];


app.get("/todos", (req, res) => {
    res.status(200).send(toDoList);
});

app.post("/todos", (req, res) => {
    toDoList.push(req.body.item);
    res.status(201).send({ message: "Task Added successfully!!" })
});

app.delete("/todos", (req, res) => {
    toDoList.find((data, index) => {
        if (data === req.body.item) {
            toDoList.splice(index, 1);
        }
    });
    res.status(202).send({ message: `${req.body.item}- has been deleted` });
});

app.all("/todos", (req, res) => {
    res.status(501).send();
});

app.all("*", (req, res) => {
    res.status(404).send();
});

app.listen(port, () => {
    console.log(`Nodejs server started on port ${port}`);
});