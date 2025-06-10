# 🏨 Hotel Rate Management API

This project is a Nest.js RESTful API that manages hotel room categories, pricing tariffs, and dynamic daily overrides. It uses PostgreSQL with TypeORM and includes Swagger documentation and Docker support.

---

## 📦 Tech Stack

- **Backend**: Nest.js (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API Docs**: Swagger (OpenAPI)
- **Containerization**: Docker, Docker Compose

---

# Behavior Example:

If you update the price for a specific date and category via the (PATCH `/api/date-prices/:category_id`) endpoint, the (GET `/api/hotel-rates/:rate_id/:dateFrom/:dateTo`) endpoint will reflect the updated price in its response for that date.

---

### 💻 How to run Locally

1. Clone the Repository

```bash
git clone https://github.com/Misha-Kirichenko/pricing-grid-test-task
cd pricing-grid-test-task
```

2. Rename the file `example.env` to `.env` in the root directory of the project.

3. Open the `.env` file and ensure that all the environment variables are set correctly

4. Run container

```bash
docker compose up --build
```

5. Open api documentation (Swagger)

_Open `http://localhost:3000/api/docs`_ in browser  
(_Note: `3000` is just an example, make sure to replace it with the value of `API_PORT` from your `.env` file._)
