import React from 'react';

export const Select = ({ children, ...props }) => {
  return <select {...props}>{children}</select>;
};

export const SelectContent = ({ children }) => <div>{children}</div>;
export const SelectItem = ({ children }) => <div>{children}</div>;
export const SelectTrigger = ({ children }) => <div>{children}</div>;
export const SelectValue = ({ children }) => <div>{children}</div>;