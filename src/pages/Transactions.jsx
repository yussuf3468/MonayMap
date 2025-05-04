import React, { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useData } from "../contexts/DataContext";
import "./Transactions.css";
import AddTransactionForm from "../components/AddTransactionForm";

const Transactions = () => {
  const { transactions, deleteTransaction, updateTransaction } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || transaction.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="transactions-page fade-in">
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <Button
          variant="primary"
          size="md"
          icon={<Plus size={18} />}
          iconPosition="left"
          onClick={openModal}
        >
          New Transaction
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-xl transform transition-all duration-300 scale-100 opacity-100">
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-error hover:text-white transition-colors duration-200"
            >
              <span className="text-xl font-bold leading-none">×</span>
            </button>

            <AddTransactionForm onClose={closeModal} />
          </div>
        </div>
      )}

      <Card className="transactions-container">
        <div className="filters-bar">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <Button
              variant={filterType === "all" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "income" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterType("income")}
            >
              Income
            </Button>
            <Button
              variant={filterType === "expense" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterType("expense")}
            >
              Expenses
            </Button>
          </div>
        </div>

        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.category}</td>
                  <td className={`amount ${transaction.type}`}>
                    {transaction.type === "expense" ? "-" : ""}$
                    {Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge ${transaction.type}`}>
                      {transaction.type === "income" ? "Income" : "Expense"}
                    </span>
                  </td>
                  <td>{transaction.note}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => updateTransaction(transaction._id)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => deleteTransaction(transaction._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="no-results">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
