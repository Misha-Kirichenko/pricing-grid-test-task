export const SWAGGER_DESC = `
## Hotel Rates Management API

A **NestJS + PostgreSQL** backend application for managing hotel room tariffs using **TypeORM**.

### Features

- Create hotel rates and associate them with multiple room categories.
- Define weekly prices (Monday through Sunday) for each room category.
- Retrieve daily prices for a given date range.
- Override specific daily prices when needed.
- Full Swagger documentation for all endpoints.

### Available Endpoints

**Hotel Rates**
- Create and manage hotel rate definitions.
- Fetch all existing hotel rates.

**Room Categories**
- Fetch all existing room categories.

**Date Prices**
- Override daily prices individually per date.

**Rate Prices**
- Assign weekly prices to room categories under a rate.
- Retrieve prices for a specific date range.
`;
