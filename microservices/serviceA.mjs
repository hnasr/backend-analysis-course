import express from 'express';
import fetch from 'node-fetch'
const app = express();

app.listen(9001);

app.get("/", async (req, res) =>  {
    
    const r = await fetch ("http://localhost:9000");
    const result = await r.text();
    res.send(result);
});


