import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    margin: 24,
  },
}));

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TextField = ({ text, onChange, value = '' }) => {
  const classes = useStyles();

  const handleChange = event => {
    onChange(capitalize(event.target.value.trim().toLowerCase()));
  };

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component="legend">{text}</FormLabel>
      <MuiTextField value={value} onChange={handleChange} />
    </FormControl>
  );
};

export default TextField;
