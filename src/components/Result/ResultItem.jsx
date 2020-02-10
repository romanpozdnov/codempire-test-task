import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  icon: {
    color: props => props.iconColor,
    verticalAlign: 'middle',
    paddingRight: 8,
  },
  item: {
    marginBottom: 24,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  divider: {
    marginTop: 24,
  },
});

const ResultItem = ({ text, mergedAnswer, options }) => {
  const icon = mergedAnswer.failed ? 'thumb_down_alt' : 'thumb_up_alt';
  const iconColor = mergedAnswer.failed ? 'red' : 'green';
  const classes = useStyles({ iconColor });

  const getLabelByValue = value => {
    if (Array.isArray(value)) {
      const result = options.filter(option => value.includes(option.value));
      return result.map(({ label }) => label).join(', ');
    }

    if (options) {
      const result = options.find(option => option.value === value);
      return result ? result.label : value;
    }
    return value;
  };

  return (
    <div className={classes.item}>
      <Typography>
        <i className={`material-icons ${classes.icon}`}>{icon}</i>
        Вопрос: {text}
      </Typography>
      <Typography>Ваш ответ: {getLabelByValue(mergedAnswer.answered)}</Typography>
      <Typography>Правильный ответ: {getLabelByValue(mergedAnswer.correct)}</Typography>
      <Divider className={classes.divider} />
    </div>
  );
};

export default ResultItem;
