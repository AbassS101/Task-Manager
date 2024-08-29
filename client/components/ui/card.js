import React from 'react';

export const Card = ({ children, ...props }) => {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, ...props }) => {
  return (
    <div className="card-content" {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, ...props }) => {
  return (
    <div className="card-header" {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, ...props }) => {
  return (
    <h2 className="card-title" {...props}>
      {children}
    </h2>
  );
};