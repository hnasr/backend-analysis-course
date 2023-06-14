 
# Use the official Docker Hub Postgres 14 base image
FROM postgres:14

# Set the working directory in the docker image
WORKDIR /docker-entrypoint-initdb.d

# Copy the sql scripts into the Docker image
COPY create_tables.sql ./