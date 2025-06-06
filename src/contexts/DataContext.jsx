import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have useAuth()

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const { token } = useAuth(); // Assuming your login sets token in context

  const authHeaders = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  // Fetch all transactions on mount if token exists
  useEffect(() => {
    if (token && loading) {
      fetchTransactions();
      fetchGoals();
    }
  }, [token, loading]);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/expenses`, authHeaders);
      setTransactions(
        res.data.map((t) => ({
          ...t,
          amount: t.type === 'expense' ? -Math.abs(Number(t.amount)) : Math.abs(Number(t.amount)),
        }))
      );
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

   const fetchGoals = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, authHeaders);
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  }, [authHeaders]);

  // updateGoals is called when a goal is created or updated
  const updateGoal = useCallback(
    async (id, updatedFields) => {
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/goals/${id}`, updatedFields, authHeaders);
        setGoals((prev) => prev.map((g) => (g._id === id ? res.data : g)));
      } catch (err) {
        console.error('Error updating goal:', err);
      }
    },
    [authHeaders]
  );

  const addTransaction = useCallback(
    async (transaction) => {
      console.log('Adding transaction:', transaction);
      try {
        const normalizedAmount =
          transaction.type === 'expense'
            ? -Math.abs(transaction.amount) 
            : Math.abs(transaction.amount);
  
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/expenses`, { ...transaction, amount: normalizedAmount }, authHeaders);
        setTransactions((prev) => [{ ...res.data, amount: normalizedAmount }, ...prev]);
      } catch (err) {
        console.error('Error adding transaction:', err);
      }
    },
    [authHeaders]
  );

  const updateTransaction = useCallback(
    async (id, updatedFields) => {
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, updatedFields, authHeaders);
        setTransactions((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      } catch (err) {
        console.error('Error updating transaction:', err);
      }
    },
    [authHeaders]
  );

  const deleteTransaction = useCallback(
    async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, authHeaders);
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error('Error deleting transaction:', err);
      }
    },
    [authHeaders]
  );

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => Math.abs(transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)),
    [transactions]
  );

  const totalBalance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totalBalance,
        totalIncome,
        totalExpenses,
        loading,
        fetchTransactions,
        goals,
        updateGoal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};