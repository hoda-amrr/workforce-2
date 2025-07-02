import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';

import { RootState } from '../../store/state.types.ts';
import messages from '../../assets/locale/messages.ts';
import { InputProps } from './input.types';
import './Input.scss';

const Input: React.FC<InputProps> = ({
  name,
  value = '',
  onChange,
  id,
  label,
  type = 'text',
  placeholder,
  required,
  defaultValue,
  isInputHasErr,
  errMsg,
  disabled,
  multiline,
  rows,
  maxRows,
  minRows,
  startAdornment,
  endAdornment,
  fullWidth = true,
  helperText,
  inputClass,
  inputWrapperClass = '',
  labelClassName,
  helperTextClass,
  labelAdornment,
  inputEndAdornment,
  isOptional,
  decimalPlaces,
  onWheel,
  minDate,
  tooltip,
  maxDate,
  hasSkeletonLoader,
  ...props
}) => {
  const lang = useSelector((state: RootState) => state.locale.lang);
  const { inputsValidations } = messages[lang];
  const [showPassword, setShowPassword] = useState(false);

  const {
    shared: { optional },
  } = messages[lang];

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && decimalPlaces !== undefined) {
      const value = e.target.value;
      if (value === '') {
        onChange?.(e);
        return;
      }
      const pattern = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
      if (pattern.test(value)) {
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // Prevent e, +, - keys
      if (['e', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={`input-wrapper ${inputWrapperClass}`}>
      <label
        className={`${labelClassName} text-gray-dark font-medium text-base block me-4`}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {label}
        {tooltip && <span className='ml-2'>{tooltip}</span>}
        <span className='text-gray-icons font-medium text-base leading-5 mx-2'>
          {isOptional ? optional : ''}
        </span>
      </label>
      {hasSkeletonLoader ? (
        <Skeleton
          variant='rectangular'
          animation='wave'
          width='100%'
          height={multiline ? 100 : 46}
          style={{ borderRadius: '12px' }}
        />
      ) : (
        <TextField
          id={id || name}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleNumberInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          error={isInputHasErr}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          maxRows={maxRows}
          minRows={minRows}
          className={inputClass}
          inputProps={{
            ...(minDate ? { min: minDate } : {}),
            ...(maxDate ? { max: maxDate } : {}),
          }}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position='start'>{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment:
              type === 'password' ? (
                <InputAdornment position='end' style={{ marginRight: '20px' }}>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                    style={{ padding: '5px' }}
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : (
                endAdornment
              ),
          }}
          onWheel={onWheel}
          {...props}
        />
      )}
      {inputEndAdornment}
      {isInputHasErr && !hasSkeletonLoader && (
        <FormHelperText
          error={isInputHasErr}
          className={`${helperTextClass || '!font-medium text-xs'}`}
        >
          {inputsValidations[errMsg]}
        </FormHelperText>
      )}
    </div>
  );
};

export default Input;
