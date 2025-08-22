# Mechanical Keyboard Shop (Backend)

## Introduction

The backend of the **Mechanical Keyboard Shop** is a RESTful API service built with Node.js, Express, TypeScript, and MongoDB. It powers the frontend by managing product data, cart, user actions, and admin operations.

## Project Description

The backend provides a secure and scalable API for e-commerce operations. It handles product CRUD, cart validation, checkout process, and integrates payment gateway (Stripe). Input validation is ensured with Zod, and Mongoose provides robust schema modeling for MongoDB.

## Features

- REST API with modular and scalable architecture.
- Product management (Create, Read, Update, Delete).
- Cart validation with stock checking.
- Checkout with **Cash on Delivery** and **Stripe**.
- Optimistic UI updates for product operations.
- Middleware for error handling and request validation.
- CORS enabled for frontend integration.
- Environment variable configuration with `.env`.

## Technology Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (Validation)
- **Stripe**

## Installation Guideline

### Prerequisites

- Node.js (>=18)
- MongoDB (Local or Atlas cluster)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sm0bin/keyshop-backend.git
   cd keyshop-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Development Server:

   ```bash
   npm run start:dev
   ```

4. Build the server:

   ```bash
   npm run build
   ```

5. Start the production server:

   ```bash
   npm run start:prod
   ```

### Configuration

Create a `.env` file in the root directory:

```bash
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/keyshopDB
PORT=5000
JWT_SECRET=XXXX
JWT_REFRESH_SECRET=XXXX
BCRYPT_SALT_ROUNDS=10
MAIL_USER=XXXX
MAIL_PASS=XXXX
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=XXXX
STRIPE_PRICE_ID=XXXX
```

## Usage

1. Run the server with `npm run start:dev`.
2. Access the API at `http://localhost:5000/api/v1`.
3. Endpoints include:

   - `GET /products` → Fetch all products
   - `GET /products/:id` → Get product details
   - `POST /products` → Add new product (Admin)
   - `PUT /products/:id` → Update product (Admin)
   - `DELETE /products/:id` → Delete product (Admin)
   - `POST /cart` → Add item to cart
   - `GET /cart/user/:userId` → Get cart by user ID
   - `GET /cart/my-cart` → Get my cart
   - `POST /cart` → Create a new cart
   - `PUT /cart/update` → Update a cart
   - `DELETE /cart/:id` → Delete a cart

---

## Live Deployment 🌐

[Client App](https://keyshop-gilt.vercel.app/)

[Backend API](https://keyshop-backend.vercel.app/api/v1)

## GitHub Repository 📂

[Frontend Repository](https://github.com/sm0bin/keyshop)

[Backend Repository](https://github.com/sm0bin/keyshop-backend)

## Project Overview Video ▶️

[Overview Video](https://drive.google.com/file/d/15bmJPhIO2PNjmXscVr_XtAJtQKRHcT-U/view?usp=drive_link)
