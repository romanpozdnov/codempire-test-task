import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MuiRadio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Radio = ({ text, onChange, value = '', options }) => {
  const classes = useStyles();

  const handleChange = event => {
    onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel>{text}</FormLabel>
      <RadioGroup aria-label="gender" onChange={handleChange} value={value}>
        {options.map(option => (
          <FormControlLabel
            value={option.value}
            control={<MuiRadio color="primary" />}
            label={option.label}
            key={option.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radio;
