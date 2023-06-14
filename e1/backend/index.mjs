import express from 'express';
import  pg  from 'pg';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8080;

console.log(process.env.PGHOST)
const pool = new pg.Pool({
 host: process.env.PGHOST,
 port: process.env.PGPORT,
 database: process.env.PGDATABASE,
 user: process.env.PGUSER,     
 password: process.env.PGPASSWORD,  
});

app.get('/', (req, res) => {
 res.sendFile(join(__dirname, 'index.html'));
});

app.get('/productTypes', async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM product_types');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({error: 'An error occurred while fetching product types.'});
 }
});

app.get('/product/:id', async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM products WHERE pid = $1', [req.params.id]);
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({error: `An error occurred while fetching product with id ${req.params.id}.`});
 }
});

app.listen(port, () => {
 console.log(`App running on port ${port}`);
});