import React, { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useData } from "../contexts/DataContext.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const Dashboard = () => {
  const tailwindColorHexMap = {
    primary: "#3b82f6",
    "primary-light": "#60a5fa",
    "primary-dark": "#1e40af",
    accent: "#f59e0b",
    "accent-light": "#fbbf24",
    "accent-dark": "#b45309",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    "gray-50": "#f9fafb",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",
    "gray-800": "#1f2937",
    "gray-900": "#111827",
  };

  const navigate = useNavigate();

  const { totalBalance, totalIncome, totalExpenses, transactions } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get recent transactions
  const recentTransactions = transactions.slice(0, 5);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const now = new Date();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const greeting = getGreeting();

  // function to navigate to transactions page
  const navigateToTransactions = () => {
    navigate("/transactions");
  };

  // function for the spending overview
  const getCategoryTotals = () => {
    const categoryMap = {};

    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
      }
    });

    const totalExpense = Object.values(categoryMap).reduce((a, b) => a + b, 0);

    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalExpense) * 100).toFixed(1),
    }));
  };

  const categoryTotals = getCategoryTotals();

  // console.log("categoryTotals", categoryTotals);

  const categoryColors = [
    "#ef4444", // red-500
    "#3b82f6", // blue-500
    "#10b981", // green-500
    "#f59e0b", // yellow-500
    "#8b5cf6", // purple-500
    "#ec4899", // pink-500
    "#f97316", // orange-500
    "#14b8a6", // teal-500
  ];

  const getCategoryColor = (index) =>
    categoryColors[index % categoryColors.length];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{greeting}</h1>
          <p className="text-muted-foreground">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
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
          <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-xl transform transition-all">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg">
            <DollarSign size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Balance
            </h3>
            <p className="text-xl font-bold">
              ${totalBalance.toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Income
            </h3>
            <p className="text-xl font-bold">${totalIncome.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg">
            <TrendingDown size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Expenses
            </h3>
            <p className="text-xl font-bold">
              -${Math.abs(totalExpenses).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Recent Transactions</h2>
            <Button variant="ghost" size="sm" onClick={navigateToTransactions}>
              View All
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className={`flex justify-between items-center p-4 rounded-lg transition ${
                  transaction.type === "income"
                    ? "bg-green-50 text-success dark:bg-transparent"
                    : "bg-red-50 text-error dark:bg-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
                    {transaction.type === "income" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                  </span>
                  <div>
                    <p className="font-medium">{transaction.category}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Spending Overview</h2>
            <Button variant="ghost" size="sm">
              This Month
            </Button>
          </div>

          <div className="flex flex-col items-center gap-6">
            {categoryTotals.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No expenses this month.
              </p>
            ) : (
              <PieChart width={400} height={320}>
                <Pie
                  data={categoryTotals.map((item) => ({
                    ...item,
                    amount: Math.abs(item.amount),
                  }))}
                  dataKey="amount"
                  cx="50%"
                  cy="50%"
                  outerRadius={80} 
                  stroke="none"
                  labelLine={true}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    outerRadius,
                    index,
                    percent,
                  }) => {

                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 20; 
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const sliceColor = getCategoryColor(index);
                    const percentage = (percent * 100).toFixed(1) + "%";

                    return (
                      <text
                        x={x}
                        y={y}
                        fill={sliceColor}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        style={{ fontSize: "12px" }}
                      >
                        {`${categoryTotals[index].category} (${percentage})`}
                      </text>
                    );
                  }}
                >
                  {categoryTotals.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getCategoryColor(index)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => {
                    const total = categoryTotals.reduce(
                      (sum, item) => sum + Math.abs(item.amount),
                      0
                    );
                    const percentValue =
                      ((value / total) * 100).toFixed(1) + "%";
                    return [`$${value} (${percentValue})`, name];
                  }}
                />
              </PieChart>
            )}

            <div className="flex flex-col gap-2 w-full">
              {categoryTotals.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded"
                    style={{ backgroundColor: getCategoryColor(index) }}
                  ></span>
                  <span className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                    {item.category} - {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
