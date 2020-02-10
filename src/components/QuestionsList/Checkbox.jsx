import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Checkbox = ({ text, onChange, value = [], options }) => {
  const classes = useStyles();

  let answers = value;

  const addAnswer = value => {
    answers.push(value);
  };

  const removeAnswer = value => {
    answers = answers.filter(answer => answer !== value);
  };

  const handleChange = event => {
    event.target.checked
      ? addAnswer(event.target.value)
      : removeAnswer(event.target.value);

    onChange(answers);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{text}</FormLabel>
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            control={
              <MuiCheckbox
                checked={answers.includes(option.value)}
                onChange={handleChange}
                value={option.value}
                color="primary"
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
