import React, {memo} from "react";
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MUISelect = ({ value, onChange, options, label, isNone }) => {
  return (

    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id={`select${label}`}>{label}</InputLabel>
      <Select
        sx={{backgroundColor: 'white'}}
        labelId={`select${label}`}
        id={`select${label}Id`}
        value={value}
        onChange={onChange}
        label={label}
      >
        {isNone && 
        <MenuItem value="">
          <em>None</em>
        </MenuItem>}
        
        {options.map((option) => (
          <MenuItem 
            value={option.value}
            key={option.value}
            >
              {option.label}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};

export default memo(MUISelect);

MUISelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  label: PropTypes.string,
  isNone: PropTypes.bool,
}

MUISelect.defaultProps = {
  value: "select",
  onChange: () => {},
  options: [],
  label: "Select",
  isNone: true
}