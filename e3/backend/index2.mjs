import express from 'express';
import  pg  from 'pg';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8082;

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
   const result = await pool.query('SELECT product_type FROM product_types');
   const types = new Set();
   for (let i = 0; i < result.rows.length; i ++ )
       types.add(result.rows[i].product_type)
    
   res.json(Array.from(types).map(a=>{ return {"product_type": a} } ));

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