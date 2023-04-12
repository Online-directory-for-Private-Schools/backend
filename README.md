# Backend

## Configuration

- You need to install docker on your machine in order to easily create the postgresql database.
- when you successfully install docker run:

```bash
docker compose up -d
```

This will download the postgres image and start the database server on port 5432

- Now you need to install the project's dependencies:
  
```bash
npm install

#or

yarn
```
- After installing dependencies, run the project using:
```bash
npm run dev

# or

yarn dev
```

## Structure explanation

#### /configs:

- Has configuration files for various libraries and frameworks as well as general project configs objects

#### /controllers:

- Has methods that are invoked by the HTTP API calls

#### /entities:

- Has model definitions for the Typeorm entity classes (User, PrivateSchool, Course,...)

#### /middlewares:

- Has middleware functions that will be invoked on the API endpoints (for example authentication middlewares)

#### /migrations:

- This folder is managed by Typeorm, we'll use it to store the migration scripts for the database.

#### /routes:

- This has definition and structure of the API's routes

#### /services:

- This has the abstract business logic code.
- This should never be dependant on external implementations (libraries, modules,...)

#### /utils:

- General utility functions used here and there by all the system.

### Clean architecture requirements:

- This project will strictly use a clean architecture.
- Well try to decouple the business logic from the database and the frameworks so that the backend system will be scalable and modular.
- The diagram below demonstrates the architecture:

![architecture](https://cdn.discordapp.com/attachments/975876776318361681/1095517674265661490/Untitled_Diagram.jpg)
