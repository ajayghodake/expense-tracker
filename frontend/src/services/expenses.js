import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

const API = axios.create({
  baseURL: 'https://expense-tracker-api-n7vc.onrender.com/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getExpenses = (params) => API.get('/expenses', {params});
export const getExpenseById = (id) => API.get(`/expenses/${id}`, {id});
export const createExpense = (data) => API.post(`/expenses`, data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const getDashboardStats = () => API.get('/expenses/dashboard');