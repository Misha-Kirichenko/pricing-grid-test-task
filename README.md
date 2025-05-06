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

## 📌 API Endpoints

### 1. **Create a new tariff**

**POST** `/api/hotel-rates`

Request Body:

```json
{
  "name": "Early Bird",
  "tags": ["promo", "non-refundable"],
  "weekPrices": [
    {
      "categoryId": "uuid-of-category",
      "prices": {
        "mon": 100,
        "tue": 100,
        "wed": 110,
        "thu": 110,
        "fri": 120,
        "sat": 130,
        "sun": 120
      }
    }
  ]
}
```

### 2. **Get tariff prices for a date range**

**GET** `/api/hotel-rates/:id/prices?dateFrom=2024-03-01&dateTo=2024-03-10`

Returns weekly base prices merged with any overrides set for specific dates.

Query Parameters:
dateFrom (string, required) — Start date in format YYYY-MM-DD

dateTo (string, required) — End date in format YYYY-MM-DD

### 3. Update price for a specific day

**PATCH** `/api/hotel-rates/:rateId/override`

Request Body:

```json
{
  "categoryId": "uuid-of-category",
  "date": "2024-03-28",
  "price": 147
}
```


# Behavior Example:
If you update the price for March 28 for category "Test" to 147,
the second endpoint (GET `/api/hotel-rates/:id/prices`) will reflect this updated price in the returned price list for that date

---

### 💻 How to run  Locally
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
````

5. Open api documentation (Swagger)

_Open `http://localhost:3000/api/docs`_ in browser  
(_Note: `3000` is just an example, make sure to replace it with the value of `API_PORT` from your `.env` file._)
