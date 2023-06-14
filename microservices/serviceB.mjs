import express from 'express';
const app = express();

app.listen(9002);

app.get("/", (req, res) => res.send("Hello from service B"));


