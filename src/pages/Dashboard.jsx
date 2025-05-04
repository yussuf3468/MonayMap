import React, { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useData } from "../contexts/DataContext.jsx";
import "./Dashboard.css";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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

  return (
    <div className="dashboard fade-in">
      <div className="page-header">
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

      <div className="stat-cards">
        <Card className="stat-card balance slide-in-up">
          <div className="stat-icon">
            <DollarSign size={20} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Total Balance</h3>
            <p className="stat-value">${totalBalance.toLocaleString()}</p>
          </div>
        </Card>

        <Card
          className="stat-card income slide-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="stat-icon">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Income</h3>
            <p className="stat-value">${totalIncome.toLocaleString()}</p>
          </div>
        </Card>

        <Card
          className="stat-card expenses slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="stat-icon">
            <TrendingDown size={20} />
          </div>
          <div className="stat-content">
            <h3 className="stat-label">Expenses</h3>
            <p className="stat-value">
              -${Math.abs(totalExpenses).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      <div className="dashboard-row">
        <Card className="recent-transactions-card">
          <div className="card-header">
            <h2 className="card-title">Recent Transactions</h2>
            <Button variant="ghost" size="sm" onClick={navigateToTransactions}>
              View All
            </Button>
          </div>

          <div className="transactions-list">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className={`transaction-item ${
                  transaction.type === "income" ? "income" : "expense"
                }`}
              >
                <div className="transaction-category">
                  <span className="category-icon">
                    {transaction.type === "income" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                  </span>
                  <div>
                    <p className="category-name">{transaction.category}</p>
                    <p className="transaction-date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="transaction-amount">
                  <p className="amount">
                    {transaction.type === "income" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="spending-overview-card">
          <div className="card-header">
            <h2 className="card-title">Spending Overview</h2>
            <Button variant="ghost" size="sm">
              This Month
            </Button>
          </div>

          <div className="chart-placeholder">
            <div className="pie-chart">
              <div
                className="pie-segment"
                style={{
                  "--percentage": "45%",
                  "--color": "var(--color-primary)",
                }}
              ></div>
              <div
                className="pie-segment"
                style={{
                  "--percentage": "30%",
                  "--color": "var(--color-accent)",
                }}
              ></div>
              <div
                className="pie-segment"
                style={{
                  "--percentage": "25%",
                  "--color": "var(--color-warning)",
                }}
              ></div>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></span>
                <span className="legend-label">Housing</span>
                <span className="legend-value">45%</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "var(--color-accent)" }}
                ></span>
                <span className="legend-label">Food</span>
                <span className="legend-value">30%</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "var(--color-warning)" }}
                ></span>
                <span className="legend-label">Entertainment</span>
                <span className="legend-value">25%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
