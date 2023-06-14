Example 3 - One backend is slow and the other is good (8081) we have nginx load balancing between the two.

set PGHOST=machinename
set PGPORT=5432
set PGDATABASE=postgres
set PGUSER=postgres
set PGPASSWORD=postgres
node index1.mjs
node index2.mjs


nginx -c nginx/nginx.conf

