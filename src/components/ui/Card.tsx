import React from 'react';
import './Card.css';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glassmorphism?: boolean;
}

const Card: React.FC<CardProps> = ({ className = '', children, glassmorphism = false }) => {
  return (
    <div className={`card ${glassmorphism ? 'glassmorphism' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;