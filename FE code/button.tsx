import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
  className,
  label,
  labelClass,
  type = 'button',
  variant = 'contained',
  disabled = false,
  onClick,
  block = false,
  color = 'primary',
  size = 'medium',
  isFilterApplied = false,
  id,
}) =>
  isFilterApplied ? (
    <div className='relative'>
      {isFilterApplied && (
        <div className='absolute top-[-3px] right-[-3px] w-4 h-4 bg-[#ED1D4E] rounded-full border-2 border-white z-10' />
      )}
      <MuiButton
        className={`btn !rounded-[8px] !py-2 ${
          block ? 'w-full' : ''
        } ${className}`}
        variant={variant}
        type={type}
        disabled={disabled}
        disableFocusRipple
        onClick={onClick}
        color={color}
        size={size}
        id={id}
      >
        <span className={`text-l ${labelClass}`}>{label}</span>
      </MuiButton>
    </div>
  ) : (
    <MuiButton
      className={`btn !rounded-[8px] !py-2 ${
        block ? 'w-full' : ''
      } ${className}`}
      variant={variant}
      type={type}
      disabled={disabled}
      disableFocusRipple
      onClick={onClick}
      color={color}
      size={size}
      id={id}
    >
      <span className={`text-l ${labelClass}`}>{label}</span>
    </MuiButton>
  );

export default Button;
