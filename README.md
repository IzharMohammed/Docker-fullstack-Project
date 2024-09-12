# 1. Start the PostgreSQL database service:
docker compose up -d db
### This command starts the `db` service (in detached mode) from the `docker-compose.yml` file.
### The `db` here is the name of the service. If you add another service, replace `db` with the name of that service.
### The `-d` flag runs the container in the background (detached mode).


# 2. Access the PostgreSQL database:
docker exec -it db psql -U postgres
### This command attaches you to the running `db` container and opens a PostgreSQL session.
### `-it` allows interaction with the container's terminal.
### `psql` is the PostgreSQL command-line client.
### `-U postgres` specifies the username to log in as, which is allocated in the `docker-compose.yml` file.


# 3. Build/Rebuild Docker containers:
docker compose build
### This command builds or rebuilds the services defined in your `docker-compose.yml` file.


# 4. Run Prisma migrations inside the backend container:
docker exec -it backend npx prisma migrate dev --name init
### This command runs Prisma migrations inside the `backend` container.
### `-it` allows interactive mode with the container.
### `npx prisma migrate dev --name init` initializes the Prisma migrations with the name `init`.
### Make sure the container name is `backend`. Adjust the command if your container has a different name.


# 5. Open Prisma Studio:
npx prisma studio
### This command opens Prisma Studio, a GUI to interact with your database models.
