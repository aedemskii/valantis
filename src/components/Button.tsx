import React from 'react';
import '../styles/Button.css';

export const Button = ({
  className,
  onClick,
  disabled = false,
  children
} : {
  className?: string,
  onClick: () => void,
  disabled?: boolean,
  children: React.ReactNode | string
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <div
      className={`button ${className ? className : 'default'} ${disabled ? 'disabled' : 'active'}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}