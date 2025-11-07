import React from 'react';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlareCard: React.FC<GlareCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glare-effect group ${className}`}>
      {children}
    </div>
  );
};

export default GlareCard;