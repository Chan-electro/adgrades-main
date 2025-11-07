import React from 'react';

const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating circle */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full animate-float blur-sm" />
      
      {/* Medium floating triangle */}
      <div className="absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-br from-primary-300/30 to-primary-500/30 transform rotate-45 animate-float-delayed" />
      
      {/* Small floating squares */}
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-gradient-to-br from-primary-500/25 to-primary-700/25 rounded-lg animate-float" />
      <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full animate-float-delayed" />
      
      {/* Gradient orbs */}
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-radial from-primary-400/15 to-transparent rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-1/3 w-20 h-20 bg-gradient-radial from-primary-300/20 to-transparent rounded-full animate-float-delayed blur-lg" />
    </div>
  );
};

export default FloatingShapes;