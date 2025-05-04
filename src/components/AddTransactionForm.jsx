import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import Button from "./ui/Button";

const AddTransactionForm = ({ onClose }) => {
  const { addTransaction } = useData();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedAmount =
      formData.type === "expense"
        ? -Math.abs(formData.amount)
        : Math.abs(formData.amount);

    await addTransaction({ ...formData, amount: normalizedAmount });
    onClose();
  };

  return (
    <form
      className="space-y-4 p-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        name="category"
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <input
        name="note"
        type="text"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
