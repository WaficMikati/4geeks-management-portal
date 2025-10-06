# Management Portal

[View Live Website](https://fourgeeks-management-portal.onrender.com/)

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

#### 1. Create a new database (you can choose any name you like, `management_portal` is my default). In your terminal, run:

```sql
psql postgres
CREATE DATABASE management_portal;
\q
```

#### 2. Rename `backend/.env.example` to `backend/.env`, then edit the `DATABASE_URL` value to reflect your PostgreSQL configuration. replace the `****` with your actual PostgreSQL user password, and use the same port as PostgreSQL (5432 is default):

```
DATABASE_URL=postgresql://postgres:****@localhost:5432/management_portal
```

### 2. Backend

I highly suggest creating a new virtual environment before installing the dependencies (listed in `backend/requirements.txt`). Skip step 2 if you prefer to work globally, but still run `cd backend`.

1. #### Change the value of `SECRET_KEY` to a **Codeigniter Key** from [randomkeygen](https://randomkeygen.com/):

```
SECRET_KEY=<key from randomkeygen>
```

2. #### Create new `venv`:

```bash
cd backend
python -m venv venv
```

3. #### Activate the `venv`:

- #### Linux/Mac

```bash
source venv/bin/activate
```

- #### Windows

```
venv\Scripts\activate
```

4. #### Install dependencies:

```bash
pip install -r requirements.txt
```

5. #### Create the database tables:

```bash
flask db upgrade
```

6. #### Seed the database to generate and add sample data

```bash
python seed_db.py
```

7. #### Finally, start the server:

```bash
python run.py
```

8. #### You can run the tests using:

```bash
pytest
```

### 3. Frontend

1. #### Install dependencies with pnpm or npm (I use pnpm):

```bash
cd frontend
pnpm install OR npm install
```

2. #### Rename `frontend/.env.example` to `frontend/.env`, and make sure it has the same port set as `FLASK_PORT` in `backend/.env` (default 5000)

```
VITE_API_URL=http://localhost:5000
```

3. #### Start the dev server, then visit the link printed in the terminal:

```bash
pnpm run dev OR npm run dev
```

### You should now be up and running!

Feel free to message me with any bugs you find.

## Personal Note

This was a fun and extremely challenging project for me to tackle. It took me around 20 hours to complete, and I learned a lot about professional code and structure (not that I have achieved it 😅). This was my first complete fullstack project, and I am proud of my result. I see the flaws and messiness still left in my code, and will clean it up and refine it over time and as my experience grows...

## Database

### 1. Tech Stack

I used PostgreSQL as it's the one we studied in the bootcamp, and my first and only database so far. I use DBeaver locally to view the database and make quick modifications.

I followed the same patterns from the Instagram and Star Wars API projects from the bootcamp.

### 2. UML Graph

You have a look at the code for this graph at [QDB](https://app.quickdatabasediagrams.com/#/d/Uiq9y1)

![UML Graph](frontend/public/uml.png)

I chose to add a `Products` table after I completed my `Users` page on the frontend, as I realized it would be very easy to create and display, and would make it easier to create orders.

### 3. Challenges

I've always been very comfortable with spreadsheets, and have written many little scripts in my life in Python, so this was very straightforward for me. There weren't any challenges as the database is simple and PostgreSQL is easy to use.

### 4. Lessons

I enjoyed learning about seeding as I've seen this technique applied in my use of p5js and gaming engines, where noise or perlin noise is what is seeded. It was interesting to be on the dev side of it this time, even though I used Faker to do that, which was very easy to use.

## Backend

### 1. Tech Stack

I am using Flask for my backend, SQLAlchemy to manage the database, and Migrate to update it with version tracking. I use Pytest for testing. I also added Gunicorn to be able to host my backend (more about this is the hosting section).

### 2. Challenges

Digging deeper into errors and returning better errors while maintaining consistency took up a large portion of my programming time. Going back and forth between the frontend fetch calls and the backend error returns was as tedious as it was rewarding. In the end I made sure to go back and make all my errors follow consistent patterns.

### 3. Lessons

I would mainly like to highlight my error checking, as it took me the most effort and time to build and refine. I followed the [MDN Standards](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) to make sure I returned appropriate status codes.

- I included 2 global errors in my `app/__init__.py` to avoid the ugly flask errors for mistyped urls, routes or API endpoints.

- To catch any route-based errors (database, bugs, etc.), I wrapped all routes with try-except blocks to return informative errors instead of crashing.

- I make sure to consistently validate form fields and return clear error messages to inform the user of the exact issue without having to check the database. I made sure to include:

  - Required fields
  - No empty fields
  - Proper email format
  - Valid numbers (for example, price cannot be less than 0)

- I used `IntegrityError` where I needed to return specific errors, such as `A user with this email already exists`. Also to rollback database on any commit errors.

- I made sure to keep my JSON responses consistent across errors so I always return data in a format expected by the frontend.

- Finally, I wrote basic tests to verify that each routes `GET` returns the correct information. I wanted to build more complex tests, but it would have taken too much time as I'm very new to them. I did try, and accidentally deleted my tables 😂. I need more time learning about proper testing as I realize it more complex than I thought.

## Frontend

### 1. Tech Stack

To put the skills and tools I learned in the bootcamp to use, I stuck with the same tech stack being taught. However, I did start the project from [my own template](https://github.com/WaficMikati/react-router-js-template) that I have been working on and expanding over the course of the bootcamp, which I try to keep updated to the latest versions of each technology:

- React 19 as the framework
- React Router v7 in Framework mode
- Vite 7 as my build tool and dev server
- Bootstrap 5 as my CSS library
- FontAwesome for my icons

### 2. Challenges

Having worked with React very intensely and in pursuit of professional code, I was very comfortable with it, especially since I have my own template built from scratch to learn React Router framework mode. This made constructing the project a breeze.

My main challenges on the front end were trying to control Bootstrap better to get the layout I wanted. Making headers stay at the top with scrolling is an issue I've always solved by using specified grid layouts and set `overflow-scroll` on the cell that would serve as the content.

Another challenge was figuring out how to make a multi-page form for new orders, with a table-based selector, and multi-selection for products.

The theme toggle was harder than I expected as well, as I usually just add `data-bs-theme` and modify the value in the `<html>` tag with React state or context, but this was causing hydration errors in React Router, so I had to use `document.documentElement.setAttribute('data-bs-theme', savedTheme)` in a `useEffect` within the my `ThemeContext`, and stored it locally to avoid flashes when refreshing or changing pages, as the SSR would cause it to revert to the light theme for a split second.

### 3. Lessons

I'd like to highlight my multi-page order system, which I created by expanding upon my pagination concept from my [Todo List](https://github.com/WaficMikati/4geeks-todo-list) project from the bootcamp.

- At first I was using a bunch of states to track the pages, but it was getting messy to manage. I ended up using a Reducer to manage the different states instead for a cleaner code.

- I used React Router's navigation system to track states and react accordingly.

- I split each page of the form into its own component to keep the code cleaner.

- I added a `preselectedUser` to the `navigate` state to be able to create an order directly from a user's profile that takes you to page two of the New Order form with the user selected. This was a nifty trick I smiled about as I saw it work.

I struggled to get the fixed headers layout I was after `d-grid`, and learning about `flex-grow` and `flex-shrink` helped get it right. I've always been a `grid` and `subgrid` user, and using Bootstrap has forced me to finally master `flex`.

I really enjoyed digging deeper into React Router and getting to know it's navigation system better. Makes things a lot easier when it comes to state management to detect loading (though I forgot to add it to the navigation of the main pages 🫣)

I'm also proud of the simple search functionality, as I built it to be frontend based for speed, and implemented term filtering that updates per render as the user types.
