// components/AddTransactionForm.jsx
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
    console.log('Submitting:', formData);
    e.preventDefault();
    const normalizedAmount =
      formData.type === "expense"
        ? -Math.abs(formData.amount)
        : Math.abs(formData.amount);

    await addTransaction({ ...formData, amount: normalizedAmount });
    onClose();
  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        name="note"
        type="text"
        placeholder="Note"
        value={formData.note}
        onChange={handleChange}
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />
      <div
        style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
      >
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
