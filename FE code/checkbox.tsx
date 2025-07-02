import React, { forwardRef, Ref } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUncheckedOutlined,
  CheckBoxOutlineBlank,
  CheckBox,
} from '@mui/icons-material';

import { RectangleCheckbox } from '../../utils/icons/RectangleCheckbox.tsx';
import { CheckedRectangleCheckbox } from '../../utils/icons/CheckedRectangleCheckbox.tsx';
import { CheckboxProps } from './checkbox.types';
import { DashCheckbox } from '../../utils/icons/DashCheckbox.tsx';
import './Checkbox.scss';
import { DisableCheckbox } from '../../utils/icons/DisableCheckboxIcon.tsx';

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      checked,
      onChange,
      name,
      color,
      labelClass,
      id,
      disabled,
      checkboxClass,
      iconShape,
      isRectangleIcon = false,
      partiallyChecked = false,
    },
    ref: Ref<HTMLButtonElement>
  ) => (
    <>
      <FormGroup className={checkboxClass} ref={ref}>
        <FormControlLabel
          className={labelClass}
          control={
            <MuiCheckbox
              checked={checked}
              onChange={onChange}
              color={color}
              name={name}
              id={id || name}
              disabled={disabled}
              icon={
                iconShape === 'circle' ? (
                  <RadioButtonUncheckedOutlined />
                ) : isRectangleIcon ? (
                  <RectangleCheckbox />
                ) : (
                  <CheckBoxOutlineBlank />
                )
              }
              checkedIcon={
                disabled ? (
                  <DisableCheckbox />
                ) : iconShape === 'circle' ? (
                  <CheckCircle />
                ) : isRectangleIcon ? (
                  partiallyChecked ? (
                    <DashCheckbox />
                  ) : (
                    <CheckedRectangleCheckbox />
                  )
                ) : (
                  <CheckBox />
                )
              }
            />
          }
          label={label}
        />
      </FormGroup>
    </>
  )
);

export default Checkbox;
