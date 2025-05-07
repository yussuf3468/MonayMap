import React, { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useData } from "../contexts/DataContext";
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
    <div className="p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transactions</h1>
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

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
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

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Note</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2">
                    <div className="mb-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="mb-4">{transaction.category}</div>
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      transaction.type === "expense"
                        ? "text-error"
                        : "text-success"
                    }`}
                  >
                    <div className="mb-4">
                      {transaction.type === "expense" ? "-" : ""}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-2 text-xs rounded-lg ${
                          transaction.type === "income"
                            ? "bg-green-100 text-success"
                            : "bg-red-100 text-error"
                        }`}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="mb-4">{transaction.note}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-4">
                      <div className="mb-4 flex gap-4">
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                          onClick={() => updateTransaction(transaction._id)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-error transition-colors"
                          onClick={() => deleteTransaction(transaction._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
