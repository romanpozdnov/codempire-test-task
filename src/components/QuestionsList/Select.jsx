import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    margin: 24,
  },
}));

const Select = ({ text, onChange, value = '', options }) => {
  const classes = useStyles();

  const handleChange = event => {
    onChange(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component="legend">{text}</FormLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
