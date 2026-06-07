import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import expenseRoutes from './routes/expenses.js';
import authRoutes from './routes/auth.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes); // Auth route
app.use('/api/expenses', expenseRoutes); // Routes added

app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});




