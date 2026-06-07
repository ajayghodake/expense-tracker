import { createContext, useContext, useState, useCallback } from 'react';

import * as api from '../services/expenses';

const ExpenseContext = createContext();

export const ExpenseProvider = ({children}) => {


    const [expenses, setExpenses] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


// Fetching Expences
    const fetchExpenses = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.getExpenses(params);
            setExpenses(res.data.data);
        } catch(err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

// Fetching Dashboard
const fetchDashboardStats = useCallback(async () => {

    setLoading(true);
    setError(null);
    try{
        const res = await api.getDashboardStats();
        setDashboardStats(res.data.data);

    } catch(err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }

}, []);

// Adding Expense
const addExpense = async (data) => {
    try{
        const res = await api.createExpense(data);
        setExpenses((prev) => [res.data.data, ...prev]);
        return res.data.data; 
    } catch (err) {
        setError(err.message);
        throw err;
    }
};

// Update Expense
const editExpense = async (id, data) => {

    try {
        const res = await api.updateExpense(id, data);

        setExpenses((prev) => prev.map(
            (e) => e._id === id ? res.data.data : e )
        );

        return res.data.data;
    } catch(err){
        setError(err.message);
        throw err;
    }
};

// Delete Expense
// const removeExpense = async (id) => {
//     try {
//         await api.deleteExpense(id);
//         setExpenses((prev) => prev.filter((e) => e._id !== id));
//     } catch(err){
//         setError(err.message);
//         throw err;
//     }
// };

// Fix - also refresh dashboard after delete
const removeExpense = async (id) => {
  try {
    await api.deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e._id !== id));
    await fetchDashboardStats();
  } catch (err) {
    setError(err.message);
    throw err;
  }
};

    return(
        <ExpenseContext.Provider value={{
            expenses, 
            dashboardStats, 
            loading, 
            error, 
            fetchExpenses, 
            fetchDashboardStats, 
            addExpense,
            editExpense,
            removeExpense, 
        }}>
            {children}
        </ExpenseContext.Provider>
    );

};

export const useExpense = () => useContext(ExpenseContext);