# Expense Tracker

A full-stack web app to track your daily expenses.

## Live Links

- Frontend: https://expense-tracker-ajay-ghodake.vercel.app
- Backend: https://expense-tracker-api-n7vc.onrender.com
- GitHub: https://github.com/ajayghodake/expense-tracker

## What it does

- Register and login with JWT auth
- Add, edit and delete expenses
- Search expenses by title or category
- Filter by category
- Dashboard showing total spend, monthly spend and recent transactions
- Pie chart for category wise breakdown
- Line chart for monthly trend
- Dark mode
- Works on mobile, tablet and desktop

## Tech Stack

**Frontend** — React, Vite, Material UI, Axios, React Hook Form, Recharts

**Backend** — Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt

## Running Locally

**Backend**
```bash
cd backend
npm install
npm run dev
```

Add a `.env` file in backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/expenses | Get all expenses |
| POST | /api/expenses | Add expense |
| PUT | /api/expenses/:id | Update expense |
| DELETE | /api/expenses/:id | Delete expense |
| GET | /api/expenses/dashboard | Dashboard stats |