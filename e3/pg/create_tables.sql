
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_types;
CREATE TABLE products (
   pid SERIAL PRIMARY KEY,
   product_name TEXT,
   product_type TEXT,
   product_price FLOAT
);

CREATE TABLE product_types (
   product_type TEXT PRIMARY KEY
);

INSERT INTO product_types (product_type) VALUES 
   ('Entertainment'), 
   ('health'), 
   ('tech'), 
   ('books'), 
   ('art');


-- Now, let's populate our 'products' table
INSERT INTO products (product_name, product_type, product_price)
SELECT
   -- Generate random product_name
   'Product ' || i AS product_name,

   -- Generate random product_type by joining with the temporary table and using 'random()'
   (ARRAY['Entertainment', 'Health', 'Tech', 'Books', 'Art'])[ mod( floor(random() * 100)::int,5) +1 ],

   -- Generate random product_price
   trunc(random()*200 + 1)

FROM generate_series(1, 100000000) AS t(i);