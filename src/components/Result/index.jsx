import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import ResultItem from './ResultItem';

import { getQuestions, getAnswers } from '../../api';

const Result = ({ userAnswers }) => {
  const [expanded, setExpanded] = useState(false);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      const loadedQuestions = await getQuestions();
      const loadedAnswers = await getAnswers();
      setQuestions(loadedQuestions);
      setAnswers(loadedAnswers);
      setFetching(false);
    })();
  }, []);

  let score = answers.count;
  const mergedAnswers = {};

  if (fetching) {
    return <CircularProgress />;
  }

  if (!userAnswers) {
    return <Redirect to="/" />;
  }

  Object.entries(answers.list).forEach(([id, answer]) => {
    if (!isEqual(sortBy(answer), sortBy(userAnswers[id]))) {
      score -= 1;
      mergedAnswers[id] = {
        answered: userAnswers[id] || 'Нет ответа',
        correct: answer,
        failed: true,
      };
    } else {
      mergedAnswers[id] = {
        answered: userAnswers[id],
        correct: answer,
        failed: false,
      };
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {`Ваш результат: ${score}/${answers.count}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleExpandClick}
            variant="contained"
            color="primary"
            fullWidth
          >
            {expanded ? 'Скрыть' : 'Показать'} правильные ответы
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {questions.list.map(({ text, id, options }) => (
              <ResultItem
                key={id}
                text={text}
                mergedAnswer={mergedAnswers[id]}
                options={options}
              />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

export default Result;
