# FINOVA API - Thunder Client Testing Guide

## Base URL
```
http://localhost:5001
```

## Important Notes
- Replace `{token}` with the JWT token received from login endpoint
- Date format should be: `2024-01-15` or ISO format
- All protected routes require `Authorization: Bearer {token}` header
- All endpoints return JSON responses

---

## AUTH ENDPOINTS

### 1. Register User
**POST** `/api/auth/register`

```
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully"
}
```

---

### 2. Login User
**POST** `/api/auth/login`

```
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Save the token for subsequent requests!**

---

### 3. Get User Profile
**GET** `/api/auth/profile`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Protected profile",
  "user": {
    "id": 1
  }
}
```

---

## TRANSACTION ENDPOINTS

### 4. Create Transaction
**POST** `/api/transactions`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "Expense",
  "amount": 500,
  "category": "Food",
  "description": "Groceries",
  "date": "2024-01-15"
}
```

**Expected Response (201):**
```json
{
  "message": "Transaction created successfully",
  "transactionId": 1
}
```

---

### 5. Get All Transactions
**GET** `/api/transactions`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Transactions fetched successfully",
  "transactions": [
    {
      "id": 1,
      "user_id": 1,
      "type": "Expense",
      "amount": 500,
      "category": "Food",
      "description": "Groceries",
      "date": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

---

### 6. Update Transaction
**PUT** `/api/transactions/{id}`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "Expense",
  "amount": 600,
  "category": "Food",
  "description": "Updated groceries",
  "date": "2024-01-15"
}
```

**Expected Response (200):**
```json
{
  "message": "Transaction updated successfully"
}
```

---

### 7. Delete Transaction
**DELETE** `/api/transactions/{id}`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Transaction deleted successfully"
}
```

---

## BUDGET ENDPOINTS

### 8. Create Budget
**POST** `/api/budget`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 5000,
  "month": "2024-01"
}
```

**Expected Response (201):**
```json
{
  "message": "Budget created successfully",
  "budgetId": 1
}
```

---

### 9. Get All Budgets
**GET** `/api/budget`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Budgets fetched successfully",
  "budgets": [
    {
      "id": 1,
      "user_id": 1,
      "amount": 5000,
      "month": "2024-01"
    }
  ]
}
```

---

### 10. Update Budget
**PUT** `/api/budget/{id}`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 6000,
  "month": "2024-01"
}
```

**Expected Response (200):**
```json
{
  "message": "Budget updated successfully"
}
```

---

## GOALS ENDPOINTS

### 11. Create Goal
**POST** `/api/goals`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Save for vacation",
  "target_amount": 10000,
  "saved_amount": 2000
}
```

**Expected Response (201):**
```json
{
  "message": "Goal created successfully",
  "goalId": 1
}
```

---

### 12. Get All Goals
**GET** `/api/goals`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Goals fetched successfully",
  "goals": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Save for vacation",
      "target_amount": 10000,
      "saved_amount": 2000
    }
  ]
}
```

---

### 13. Update Goal
**PUT** `/api/goals/{id}`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Save for vacation",
  "target_amount": 12000,
  "saved_amount": 3000
}
```

**Expected Response (200):**
```json
{
  "message": "Goal updated successfully"
}
```

---

### 14. Delete Goal
**DELETE** `/api/goals/{id}`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Goal deleted successfully"
}
```

---

## DASHBOARD ENDPOINT

### 15. Get Dashboard
**GET** `/api/dashboard`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "message": "Dashboard data fetched successfully",
  "dashboard": {
    "totalIncome": 15000,
    "totalExpense": 5000,
    "balance": 10000,
    "latestTransactions": [
      {
        "id": 1,
        "user_id": 1,
        "type": "Expense",
        "amount": 500,
        "category": "Food",
        "description": "Groceries",
        "date": "2024-01-15T00:00:00.000Z"
      }
    ]
  }
}
```

---

## REPORTS ENDPOINTS

### 16. Get Monthly Report
**GET** `/api/reports/monthly?month=2024-01`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

Query Parameters:
- month (required): Format YYYY-MM (e.g., 2024-01)
```

**Expected Response (200):**
```json
{
  "message": "Monthly report fetched successfully",
  "report": {
    "month": "2024-01",
    "totalIncome": 15000,
    "totalExpense": 5000,
    "balance": 10000
  }
}
```

---

### 17. Get Category Report
**GET** `/api/reports/category?month=2024-01`

```
Headers:
Authorization: Bearer {token}
Content-Type: application/json

Query Parameters:
- month (optional): Format YYYY-MM (e.g., 2024-01)
  - If not provided, returns all-time report
```

**Expected Response (200):**
```json
{
  "message": "Category report fetched successfully",
  "report": {
    "month": "2024-01",
    "byCategory": [
      {
        "category": "Food",
        "type": "Expense",
        "total": 2000,
        "count": 4
      }
    ]
  }
}
```

---

## ERROR RESPONSES

All endpoints return appropriate error messages:

### 400 Bad Request
```json
{
  "message": "Missing required fields: type, amount, category"
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "message": "Transaction not found or unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error creating transaction",
  "error": "error message details"
}
```

---

## Testing Order (Recommended)

1. **Register** → Get test user
2. **Login** → Get JWT token
3. **Get Profile** → Verify token works
4. **Create Transaction** → Add data
5. **Get Transactions** → Retrieve all
6. **Update Transaction** → Modify data
7. **Create Budget** → Add budget
8. **Get Budget** → Retrieve budgets
9. **Create Goal** → Add goal
10. **Update Goal** → Modify goal
11. **Get Dashboard** → View summary
12. **Get Monthly Report** → Monthly stats
13. **Get Category Report** → Category breakdown
14. **Delete Transaction** → Test delete
15. **Delete Goal** → Test delete

---

## Important Headers
```
Content-Type: application/json
Authorization: Bearer {jwt_token}
```

---

## Database Schema (For Reference)

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Transactions Table
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('Income', 'Expense') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Budgets Table
CREATE TABLE budgets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  month VARCHAR(7) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Goals Table
CREATE TABLE goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  target_amount DECIMAL(10, 2) NOT NULL,
  saved_amount DECIMAL(10, 2) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---
