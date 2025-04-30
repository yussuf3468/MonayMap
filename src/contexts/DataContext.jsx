import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext(undefined);

// Sample data
const mockTransactions = [
  {
    id: '1',
    date: '2025-06-01',
    category: 'Salary',
    amount: 5000,
    type: 'income',
    note: 'Monthly salary'
  },
  {
    id: '2',
    date: '2025-06-02',
    category: 'Groceries',
    amount: 120,
    type: 'expense',
    note: 'Weekly grocery shopping'
  },
  {
    id: '3',
    date: '2025-06-03',
    category: 'Dining',
    amount: 45,
    type: 'expense',
    note: 'Dinner with friends'
  },
  {
    id: '4',
    date: '2025-06-05',
    category: 'Freelance',
    amount: 750,
    type: 'income',
    note: 'Web design project'
  },
  {
    id: '5',
    date: '2025-06-08',
    category: 'Utilities',
    amount: 85,
    type: 'expense',
    note: 'Electricity bill'
  }
];

const mockGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: '2025-12-31',
    category: 'Savings'
  },
  {
    id: '2',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 750,
    deadline: '2025-09-30',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Vacation',
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: '2025-08-15',
    category: 'Travel'
  }
];

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [goals, setGoals] = useState(mockGoals);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const updateTransaction = (id, updatedFields) => {
    setTransactions(
      transactions.map(t =>
        t.id === id ? { ...t, ...updatedFields } : t
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id, updatedFields) => {
    setGoals(
      goals.map(g =>
        g.id === id ? { ...g, ...updatedFields } : g
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        transactions,
        goals,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        totalBalance,
        totalIncome,
        totalExpenses
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
