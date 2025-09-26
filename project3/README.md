# 🚀 Backend Project

A robust backend application built with modern technologies for scalable web development.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Prisma** - Database ORM and toolkit
- **Docker** - Containerization platform

## Explanation

- **ORM**: (as in PostgreSQL) is the middleman between JavaScript and PostgreSQL
  $$( JavaScript - ORM(Prisma) - PostgreSQL )$$

## Getting Started

0. Install Docker Desktop

1. Clone the Repository:

```
git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app
```

2.Generate the Prisma Client:

```
npx prisma generate
```

3. Build your docker images:

```
docker compose build
```

4. Create PostgreSQL migrations and apply them:

```
docker compose run app npx prisma migrate dev --name init
```

Also - to run/apply migrations if necessary:

```
docker-compose run app npx prisma migrate deploy
```

5. Boot up 2x docker containers:

```
docker compose up
```

or

```
docker compose up -d
```

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

6. To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!:

```
docker exec -it postgres-db psql -U postgres -d todoapp
```

7. To stop Docker containers:

```
docker compose down
```

8. To delete all docker containers:

```
docker system prune
```

9. Access the App:
   Open http://localhost:5003 (or localhost:3000 if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.
