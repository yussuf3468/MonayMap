import React from 'react';
import { Plus, Archive, CheckSquare } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import './Goals.css';

const Goals: React.FC = () => {
  const { goals, updateGoal } = useData();

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="goals-page fade-in">
      <div className="page-header">
        <h1 className="page-title">Savings Goals</h1>
        <Button 
          variant="primary" 
          size="md" 
          icon={<Plus size={18} />}
          iconPosition="left"
        >
          New Goal
        </Button>
      </div>

      <div className="goals-grid">
        {goals.map(goal => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          const isCompleted = progress === 100;
          
          return (
            <Card 
              key={goal.id} 
              className={`goal-card ${isCompleted ? 'completed' : ''} slide-in-up`}
            >
              <div className="goal-header">
                <h3 className="goal-name">{goal.name}</h3>
                <span className="goal-category">{goal.category}</span>
              </div>
              
              <div className="goal-amounts">
                <div className="amount-group">
                  <span className="amount-label">Target</span>
                  <span className="amount-value">${goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="amount-group">
                  <span className="amount-label">Saved</span>
                  <span className="amount-value">${goal.currentAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <span className="progress-text">{progress}%</span>
              </div>
              
              {!isCompleted ? (
                <div className="goal-footer">
                  <span className="remaining-amount">
                    ${remainingAmount.toLocaleString()} left
                  </span>
                  <span className="deadline">
                    Due {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <div className="goal-completed">
                  <CheckSquare size={18} />
                  <span>Goal achieved!</span>
                </div>
              )}
              
              <div className="goal-actions">
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={<Archive size={16} />}
                >
                  Archive
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      
      {goals.length === 0 && (
        <div className="no-goals">
          <h3>No savings goals found</h3>
          <p>Create your first savings goal to start tracking your progress.</p>
          <Button variant="primary" icon={<Plus size={18} />}>
            Create Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default Goals;