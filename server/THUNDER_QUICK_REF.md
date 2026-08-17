# FINOVA - Quick Thunder Client Commands

## Setup: Start Server First
```bash
cd server && npm run dev
# Server runs on http://localhost:5001
```

---

## 1. REGISTER USER
```
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:** `{"message": "User registered successfully"}`

---

## 2. LOGIN & GET TOKEN
```
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:** 
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {"id": 1, "name": "Test User", "email": "test@example.com"}
}
```
⚠️ **SAVE THIS TOKEN FOR ALL PROTECTED REQUESTS**

---

## 3. GET PROFILE (Test Protected Route)
```
GET http://localhost:5001/api/auth/profile
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:** `{"message": "Protected profile", "user": {"id": 1}}`

---

## 4. CREATE TRANSACTION (Income)
```
POST http://localhost:5001/api/transactions
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "type": "Income",
  "amount": 5000,
  "category": "Salary",
  "description": "Monthly salary",
  "date": "2024-01-15"
}
```

**Response:** `{"message": "Transaction created successfully", "transactionId": 1}`

---

## 5. CREATE TRANSACTION (Expense)
```
POST http://localhost:5001/api/transactions
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "type": "Expense",
  "amount": 500,
  "category": "Food",
  "description": "Groceries",
  "date": "2024-01-15"
}
```

**Response:** `{"message": "Transaction created successfully", "transactionId": 2}`

---

## 6. GET ALL TRANSACTIONS
```
GET http://localhost:5001/api/transactions
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:** 
```json
{
  "message": "Transactions fetched successfully",
  "transactions": [
    {"id": 1, "user_id": 1, "type": "Income", "amount": 5000, ...},
    {"id": 2, "user_id": 1, "type": "Expense", "amount": 500, ...}
  ]
}
```

---

## 7. UPDATE TRANSACTION
```
PUT http://localhost:5001/api/transactions/1
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "type": "Income",
  "amount": 5500,
  "category": "Salary",
  "description": "Updated salary",
  "date": "2024-01-15"
}
```

**Response:** `{"message": "Transaction updated successfully"}`

---

## 8. DELETE TRANSACTION
```
DELETE http://localhost:5001/api/transactions/1
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:** `{"message": "Transaction deleted successfully"}`

---

## 9. CREATE BUDGET
```
POST http://localhost:5001/api/budget
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "amount": 5000,
  "month": "2024-01"
}
```

**Response:** `{"message": "Budget created successfully", "budgetId": 1}`

---

## 10. GET ALL BUDGETS
```
GET http://localhost:5001/api/budget
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Budgets fetched successfully",
  "budgets": [
    {"id": 1, "user_id": 1, "amount": 5000, "month": "2024-01"}
  ]
}
```

---

## 11. UPDATE BUDGET
```
PUT http://localhost:5001/api/budget/1
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "amount": 6000,
  "month": "2024-01"
}
```

**Response:** `{"message": "Budget updated successfully"}`

---

## 12. CREATE GOAL
```
POST http://localhost:5001/api/goals
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Save for vacation",
  "target_amount": 10000,
  "saved_amount": 2000
}
```

**Response:** `{"message": "Goal created successfully", "goalId": 1}`

---

## 13. GET ALL GOALS
```
GET http://localhost:5001/api/goals
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Goals fetched successfully",
  "goals": [
    {"id": 1, "user_id": 1, "title": "Save for vacation", "target_amount": 10000, "saved_amount": 2000}
  ]
}
```

---

## 14. UPDATE GOAL
```
PUT http://localhost:5001/api/goals/1
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json

{
  "title": "Save for vacation",
  "target_amount": 12000,
  "saved_amount": 3000
}
```

**Response:** `{"message": "Goal updated successfully"}`

---

## 15. DELETE GOAL
```
DELETE http://localhost:5001/api/goals/1
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:** `{"message": "Goal deleted successfully"}`

---

## 16. GET DASHBOARD
```
GET http://localhost:5001/api/dashboard
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Dashboard data fetched successfully",
  "dashboard": {
    "totalIncome": 5000,
    "totalExpense": 500,
    "balance": 4500,
    "latestTransactions": [...]
  }
}
```

---

## 17. GET MONTHLY REPORT
```
GET http://localhost:5001/api/reports/monthly?month=2024-01
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Monthly report fetched successfully",
  "report": {
    "month": "2024-01",
    "totalIncome": 5000,
    "totalExpense": 500,
    "balance": 4500
  }
}
```

---

## 18. GET CATEGORY REPORT
```
GET http://localhost:5001/api/reports/category?month=2024-01
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Category report fetched successfully",
  "report": {
    "month": "2024-01",
    "byCategory": [
      {"category": "Food", "type": "Expense", "total": 500, "count": 1},
      {"category": "Salary", "type": "Income", "total": 5000, "count": 1}
    ]
  }
}
```

---

## OPTIONAL: GET CATEGORY REPORT (All-time)
```
GET http://localhost:5001/api/reports/category
Authorization: Bearer <PASTE_TOKEN_HERE>
Content-Type: application/json
```

**Response:** Category breakdown for all-time (no month filter)

---

## ⚠️ IMPORTANT

### All Headers for Protected Routes:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

### Date Format:
- Use `YYYY-MM-DD` format (e.g., `2024-01-15`)

### Month Format (for reports/budgets):
- Use `YYYY-MM` format (e.g., `2024-01`)

### Error Handling:
- **401**: Token missing or invalid → Re-login
- **404**: Resource not found or unauthorized
- **400**: Bad request → Check required fields
- **500**: Server error → Check console

---

## Testing Flow

1. ✅ Register → Get user
2. ✅ Login → Get token
3. ✅ Profile → Verify auth works
4. ✅ Create Income → Add money in
5. ✅ Create Expense → Add money out
6. ✅ Get Transactions → See all
7. ✅ Update Transaction → Modify data
8. ✅ Create Budget → Set budget
9. ✅ Create Goal → Add saving goal
10. ✅ Dashboard → View summary
11. ✅ Monthly Report → Month stats
12. ✅ Category Report → Category stats
13. ✅ Delete Transaction → Clean up
14. ✅ Delete Goal → Clean up

---
