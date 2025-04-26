import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import './Analytics.css';

type TimeRange = 'week' | 'month' | 'year';

const Analytics: React.FC = () => {
  // const { transactions } = useData();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  // Mock data for charts
  const expensesByCategory = [
    { category: 'Housing', amount: 1200, percentage: 40 },
    { category: 'Food', amount: 600, percentage: 20 },
    { category: 'Transportation', amount: 450, percentage: 15 },
    { category: 'Entertainment', amount: 300, percentage: 10 },
    { category: 'Utilities', amount: 240, percentage: 8 },
    { category: 'Other', amount: 210, percentage: 7 }
  ];

  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 4000 },
    { month: 'Feb', income: 5200, expenses: 3800 },
    { month: 'Mar', income: 5100, expenses: 4200 },
    { month: 'Apr', income: 5300, expenses: 3900 },
    { month: 'May', income: 5500, expenses: 4100 },
    { month: 'Jun', income: 5400, expenses: 4300 },
  ];

  // Calculate max value for the chart scaling
  const maxValue = Math.max(
    ...monthlyData.map(item => Math.max(item.income, item.expenses))
  );

  // Calculate total expenses
  const totalExpenses = expensesByCategory.reduce(
    (total, item) => total + item.amount, 
    0
  );

  return (
    <div className="analytics-page fade-in">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        
        <div className="time-range-selector">
          <Button 
            variant={timeRange === 'week' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === 'year' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('year')}
          >
            Year
          </Button>
        </div>
      </div>

      <div className="analytics-grid">
        <Card className="expenses-by-category slide-in-up">
          <h2 className="card-title">Expenses by Category</h2>
          
          <div className="chart-container">
            <div className="donut-chart">
              {expensesByCategory.map((item, index) => (
                <div 
                  key={item.category}
                  className="donut-segment"
                  style={{
                    '--percentage': `${item.percentage}%`,
                    '--color': `var(--chart-color-${index + 1})`,
                    '--rotation': calculateRotation(index, expensesByCategory)
                  } as React.CSSProperties}
                ></div>
              ))}
              <div className="donut-hole">
                <p className="donut-total">${totalExpenses}</p>
                <p className="donut-label">Total</p>
              </div>
            </div>
            
            <div className="category-legend">
              {expensesByCategory.map((item, index) => (
                <div key={item.category} className="legend-item">
                  <div 
                    className="legend-color"
                    style={{ backgroundColor: `var(--chart-color-${index + 1})` }}
                  ></div>
                  <div className="legend-details">
                    <div className="legend-text">
                      <span className="legend-label">{item.category}</span>
                      <span className="legend-percentage">{item.percentage}%</span>
                    </div>
                    <span className="legend-amount">${item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card className="income-vs-expenses slide-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="card-title">Income vs Expenses</h2>
          
          <div className="bar-chart">
            {monthlyData.map(item => (
              <div key={item.month} className="bar-group">
                <div className="bar-container">
                  <div 
                    className="bar income-bar"
                    style={{ height: `${(item.income / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">${item.income}</span>
                  </div>
                  <div 
                    className="bar expense-bar"
                    style={{ height: `${(item.expenses / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">${item.expenses}</span>
                  </div>
                </div>
                <div className="bar-label">{item.month}</div>
              </div>
            ))}
          </div>
          
          <div className="chart-legend horizontal">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <span className="legend-label">Income</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'var(--color-error)' }}></div>
              <span className="legend-label">Expenses</span>
            </div>
          </div>
        </Card>
        
        <Card className="spending-trends slide-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="card-title">Spending Trends</h2>
          
          <div className="trend-chart">
            <div className="trend-y-axis">
              <span>$5k</span>
              <span>$4k</span>
              <span>$3k</span>
              <span>$2k</span>
              <span>$1k</span>
              <span>$0</span>
            </div>
            
            <div className="trend-lines">
              <div className="trend-grid-lines">
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
              </div>
              
              <svg className="trend-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                <polyline
                  className="trend-line expense-line"
                  points="0,120 100,140 200,100 300,130 400,110 500,90 600,105"
                ></polyline>
                <polyline
                  className="trend-line income-line"
                  points="0,80 100,70 200,75 300,60 400,50 500,55 600,40"
                ></polyline>
              </svg>
              
              <div className="trend-x-axis">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
          
          <div className="chart-legend horizontal">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <span className="legend-label">Income</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: 'var(--color-error)' }}></div>
              <span className="legend-label">Expenses</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Helper function to calculate rotation for donut chart segments
const calculateRotation = (index: number, data: { percentage: number }[]) => {
  let rotation = 0;
  for (let i = 0; i < index; i++) {
    rotation += data[i].percentage * 3.6; // Convert percentage to degrees (360 / 100 = 3.6)
  }
  return `${rotation}deg`;
};

export default Analytics;