# Management Portal

[View Live Website](https://fourgeeks-management-portal.render.com/)

![Preview](frontend/public/preview.png)

## Table of Contents

- [Instructions](#instructions)

- [Personal Note](#personal-note)

- [Database](#database)

  - [Tech Stack](#db-stack)
  - [UML Graph](#uml)
  - [Challenges](#db-challenges)
  - [Lessons](#db-lessons)

- [Backend](#backend)

  - [Tech Stack](#back-stack)
  - [Challenges](#back-challenges)
  - [Lessons](#back-lessons)

- [Frontend](#frontend)
  - [Tech Stack](#front-stack)
  - [Challenges](#front-challenges)
  - [Lessons](#front-lessons)

## Instructions

### 1. Database

I use PostgreSQL and therefore can only provide instructions for that. Make sure you have it [installed](https://www.postgresql.org/download/) on your system.

1. Create a new database (you can choose any name you like, `management_portal` is my default). In your terminal, run:

```sql
psql postgres
CREATE DATABASE management_portal;
\q
```

2. Rename `backend/.env.example` to `backend/.env`, then edit the `DATABASE_URL` value to reflect your PostgreSQL configuration. replace the `****` with your actual PostgreSQL user password, and use the same port as PostgreSQL (5432 is default):

```
DATABASE_URL=postgresql://postgres:****@localhost:5432/management_portal
```

### 2. Backend

I highly suggest creating a new virtual environment before installing the dependendcies (listed in `backend/requirements.text`). Skip line 2 of step 1 if you prefer to work globally.

1. #### Create new `venv`:

```bash
cd backend
python -m venv venv
```

2. #### Activate the `venv`:

- #### Linux/Mac

```bash
source venv/bin/activate
```

- #### Windows

```
venv\Scripts\activate
```

3.  #### Install dependencies:

```bash
pip install -r requirements.txt
```

4. #### Create the database tables:

```bash
flask db upgrade
```

5. #### Seed the database to generate and add sample data

```bash
python seed_db.py
```

6. #### Finally, start the server:

```bash
python run.py
```

### 3. Frontend

## Personal Note

This was a fun and extremely challenging project for me to tackle. It took me around 20 hours to complete, and I learned a lot about professional code and structure (not that I have achieved it 😅). This was my first complete fullstack project, and I am proud of my result. I see the flaw and messiness still leftover in my code, and will clean it up and refine it over time and as my experience grows...

```

```
