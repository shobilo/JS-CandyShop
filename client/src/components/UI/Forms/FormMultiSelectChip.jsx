import PropTypes from 'prop-types'
import {useField, useFormikContext} from 'formik'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { getTitleCase } from '../../../utils/getTitleCase'
import {useCallback, useState} from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, options, theme) {
  return {
    fontWeight:
    options.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormMultiSelectChip = (props) => {
  const {name, options, label = "Options", ...otherProps} = props
  
  const theme = useTheme();
  const [field, meta] = useField(name)
  
  const selectedItems = options.filter((option) => {
    return field.value.some((value) => value.id === option.id)
  })

  const handleChipViewChange = useCallback((selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((option) => (
        <Chip 
          key={option.id} 
          label={getTitleCase(`${option?.name} : ${option?.description}`)} 
        />
      ))}
    </Box>
  ), [])

  const configMultiSelect = {
    multiple: true,
    variant: 'outlined',
    fullWidth: true,
    labelId:`multiple-chip-label-${name}`,
    id:`multiple-chip-${name}`,
    input: <OutlinedInput id="select-multiple-chip" label={label} />,
    renderValue: handleChipViewChange,
    MenuProps: MenuProps,
    ...field,
    value: selectedItems,
    ...otherProps,
  }

  if (meta && meta.touched && meta.error) {
    configMultiSelect.error = true
    configMultiSelect.helperText = meta.error
  }
  
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`multiple-chip-label-${name}`}>{label}</InputLabel>
        <Select
          {...configMultiSelect}
        >
          {options?.map((option) => (
            <MenuItem
              key={option?.id}
              value={option}
              style={getStyles(option, options, theme)}
            >
              {getTitleCase(`${option?.name} : ${option?.description}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FormMultiSelectChip

FormMultiSelectChip.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string
}

FormMultiSelectChip.defaultProps = {
  label: "Options"
}