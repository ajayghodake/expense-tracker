import express from 'express';

import {getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense, getDashboardStats} from '../controllers/expenseControllers.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;