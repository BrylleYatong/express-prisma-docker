node version 20.13.1 must be used for this project----------------
https://www.youtube.com/watch?v=NaqNk2TbeRE

Initialize git first in the root project
    - 3:28

Running the postgres database using docker
    - 4:28
    - running the postgres using docker command (6:18) "docker compose up -d <name of the db>", this will refer to the compose.yaml file
        - docker compose up -d db
            - this will also pull images from the docker hub if first time to run

To check if it is running use "docker ps -a"

Going inside the dockerize postgres
    - 7:25
    - "docker exec -it <name of the database> psql -U postgres"
        - "docker exec -it db psql -U postgres" 
    - to check if there is created tables use "\dt"
    - use "exit" if want to exit

Creating the backend
    - 8:44
    - initializing the prisma in the backend (10:25) "npx prisma init"
    - changing the DATABASE_URL in env "11:32"

Creating a table
    - 11:50
    - go to schema.prisma file

Continue creating the backend
    - 13:25
    
Generate the schema with Prisma
    - 21:07
    - "npx prisma generate" must be in the backend folder path

Dockerize the backend
    - 22:49
    - to have an effect the created backend.dockerfile (26:04)
    - need to build a docker image for the backend docker (28:00)
        - docker compose build (this command always run the compose.yaml file file to build added services and build an image according to that service)
    - to run the created image use "docker compose up -d <service name>"
        - docker compose up -d backend

    ***TO CHECK IF THERE IS CREATED TABLE IN THE DOCKERIZE POSTGRES***
        - "docker exec -it <name of the database> psql -U postgres"
            - "docker exec -it db psql -U postgres" 
        - to check if there is created tables use "\dt" 
    *** IF NO TABLES DO THIS ***
        -  docker exec -it backend npx prisma migrate dev --name init
            - "docker exec -it backend" is going inside of the dockerize backend terminal
            - "npx prisma migrate dev --name init" initialize database schema in the dockerize backend

Creating the frontend
    - 38:04
    - go back to the root folder
    - npx create-next-app@latest --no-git
        - "--no-git" in the command specify not creating a git repository since we have it in the root folder
            - Typescript "yes"
            - ESLint "yes"
            - Tailwind "yes"
            - src/ directory "yes"
            - App Router "no"
            - Import alias "no"
    - npm run dev
    - removing the dark background (41:30)

Dockerize the frontend
    - 1:02:25
    - creating dockerfile for frontend (1:06:06)
    - type "docker compose build" (this command always run the compose.yaml file file to build added services and build an image according to that service)
    - then running the frontend created service
        - docker compose up -d <service name>
            - "docker compose up -d frontend"


-----------------------  if there are changes on the file do this steps:
    If you are using Docker Compose, the process is even simpler. After updating your codebase, you can run:

        docker-compose build
        docker-compose up -d

    The docker-compose build command rebuilds the images specified in your docker-compose.yml file. 
    The docker-compose up -d command starts the containers in detached mode, 
        automatically stopping and removing the old containers and running the updated images.

    If using Docker Compose:

        - Update your codebase.
        - Run docker-compose build.
        - Run docker-compose up -d.

