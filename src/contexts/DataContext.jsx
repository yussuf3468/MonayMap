import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have useAuth()

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
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