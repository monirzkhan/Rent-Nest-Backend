# 🏠 RentNest Backend

A secure, scalable, and production-ready RESTful API for the **RentNest** house rental platform. This backend enables property owners to list rental properties, tenants to request rentals, administrators to manage the platform, and tenants to complete secure online payments.

Built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe**.

---

## 🚀 Live API

> **Base URL**
```
https://rentnest-seven.vercel.app/
```

---

## 📖 Project Overview

RentNest is a modern property rental management system designed to simplify the rental process for landlords, tenants, and administrators.

The platform provides secure authentication, property management, rental request workflows, payment processing, reviews, and role-based authorization while maintaining a clean and scalable architecture.

---

# ✨ Features

### 🔐 Authentication & Authorization

- JWT Authentication
- Role-Based Access Control (Admin, Landlord, Tenant)
- Password Hashing with bcrypt
- Secure Protected Routes

### 👤 User Management

- User Registration
- User Login
- Get User Profile
- Update Profile
- Change Password

### 🏠 Property Management

- Create Property
- Update Property
- Delete Property
- View All Properties
- Search & Filter Properties
- Pagination
- Sorting


### 📄 Rental Management

- Submit Rental Request
- Approve Rental Request
- Reject Rental Request
- Prevent Duplicate Rentals
- Track Rental Status

### 💳 Payment Integration

- Stripe Payment Gateway
- Payment Intent Creation
- Payment Verification
- Payment History

### ⭐ Review System

- Create Review
- Property Ratings
- Tenant Reviews

### 🛡️ Security

- JWT Authentication
- Password Encryption
- Request Validation
- Global Error Handling
- Environment Variables
- CORS Protection

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Payment

- Stripe


## Development Tools

- ESLint
- Prettier
- ts-node-dev

---

# 📁 Project Structure

```
src
│
│── ├── modules
│   │   ├── admin   
│   │   ├── auth
│   │   ├── category
│   │   ├── lanlordManagement
│   │   ├── payment
│   │   ├── property
│   │   ├── rentals
│   │   └── review
│   │
│   ├── middlewares
│   │   ├── auth
│   │   ├── globalErrorHandler
│   │   ├── notFound 
│   │   ├── notFound 
│   │
│   └── utilities
│       ├── cathcAsync
│       ├── jwt
│       ├── sendResponse
│
│
├── config
├── lib
├── app.ts
└── server.ts
```

---

# 🗄 Database Schema

Main entities:

- User
- Property
- Rental Request
- Payment
- Review

Relationships

```
User
 ├── Properties
 ├── Rental Requests
 ├── Reviews

Property
 ├── Rental Requests
 └── Reviews

Rental Request
 └── Payment
```

---

# 🔑 User Roles

| Role | Permissions |
|------|-------------|
| Admin | Manage all users, oversee all listings & requests, manage categories |
| Landlord | Create/manage listings, approve/reject requests, view tenant history |
| Tenant | Browse listings, submit rental requests, leave reviews, manage profile |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/rentnest-backend.git
```

```bash
cd rentnest-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create a `.env` file in the project root.

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=https://rentnest-seven.vercel.app/

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=jwt_access_expire_in
JWT_REFRESH_EXPIRES_IN=jwt_refresh_expire_in

BCRYPT_SALT_ROUNDS=Bcrypt_salt_rounds

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run Database Migration

```bash
npx prisma migrate dev
```

---

## Start Development Server

```bash
npm run dev
```

---

## Build Project

```bash
npm run build
```

---

## Run Production

```bash
npm start
```

---

# 📌 API Endpoints

## Authentication

```
POST   /auth/register
POST   /auth/login
GET   /auth/me
```

---


## Properties

```
POST   /properties
GET    /properties
GET    /properties/:id
PATCH  /properties/:id
DELETE /properties/:id
```

---

## Rental Requests

```
POST   /rental-requests
GET    /rental-requests
GET  /rental-requests/:id/
```

---

## Payments

```
POST   /payments/create
POST   /payments/confirm
GET    /payments/
GET    /payments/:id
```

---

## Reviews

```
POST   /reviews

```

---

# 🔍 Query Features

Supports

- Pagination
- Sorting
- Filtering
- Searching

Example

```
GET /properties?page=1&limit=10&minRent=5000&maxRent=15000&location=Dhaka&search=Apartment&sortBy=rentAmount&sortOrder=asc
```

---

# 🧪 Scripts

```bash
npm run dev
```

Run development server.

```bash
npm run build
```

Build project.

```bash
npm start
```

Run production build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run format
```

Format using Prettier.

---

# 📸 API Documentation

The complete API documentation is available through Postman.

Includes:

- Authentication
- Users
- Properties
- Rental Requests
- Payments
- Reviews

---

# 🔒 Authentication Flow

```
User Login
      │
      ▼
Generate JWT
      │
      ▼
Client Stores Token
      │
      ▼
Authorization Header
      │
      ▼
Protected Routes
```

---

# 🚀 Future Improvements

- Email Verification
- Forgot Password
- Property Wishlist
- Image Upload with Cloudinary
- Notifications
- Admin Dashboard Analytics
- Property Availability Calendar
- Real-time Chat
- Booking Cancellation
- Docker Support
- CI/CD Pipeline

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Mohammad Moniruzzaman**

Full Stack Developer

GitHub: https://github.com/Monirzkhan

LinkedIn: https://linkedin.com/in/monirzkhan-dev

Email: mmonirz.dev@gmail.com

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.