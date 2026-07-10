# Expense Management System

A full-stack Employee Expense Management System developed using React, Spring Boot, and MySQL.

## Features

* Role-based Login (Admin & Employee)
* BCrypt Password Encryption
* Add Expense with Receipt Upload
* Employee Dashboard
* Admin Dashboard
* Expense Category Pie Chart
* Frontend & Backend Validation
* MySQL Database Integration

## Tech Stack

**Frontend**

* React (Vite)
* Bootstrap
* Axios
* React Router DOM
* Recharts

**Backend**

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Validation
* Spring Security Crypto (BCrypt)
* Lombok

**Database**

* MySQL

## Setup

### 1. Create Database

```sql
CREATE DATABASE expense_management;
```

### 2. Configure Database

Update the following in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the Backend

```bash
mvn spring-boot:run
```

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

## Login Credentials

### Admin

| Email                                   | Password |
| --------------------------------------- | -------- |
| [admin@test.com](mailto:admin@test.com) | admin123 |

### Employees

| Email                                   | Password |
| --------------------------------------- | -------- |
| [rahul@test.com](mailto:rahul@test.com) | rahul123 |
| [priya@test.com](mailto:priya@test.com) | priya123 |
| [amit@test.com](mailto:amit@test.com)   | amit123  |

## Project Structure

```
expense-management/
├── backend/
└── frontend/
```
