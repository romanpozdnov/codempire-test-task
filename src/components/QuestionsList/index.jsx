import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';
import Text from './TextField';
import ConfirmDialog from './ConfirmDialog';

import { getQuestions } from '../../api';

import { LOCAL_STORAGE_KEY, FIELD_TYPES } from '../../constants';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  card: {
    minWidth: 475,
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 24,
  },
});

const QuestionsList = ({ confirmAnswer }) => {
  const classes = useStyles();
  const history = useHistory();

  const [answered, setAnswer] = useLocalStorage(LOCAL_STORAGE_KEY, {});

  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      const loadedQuestions = await getQuestions();
      setQuestions(loadedQuestions);
      setFetching(false);
    })();
  }, []);

  const setAnswerById = id => value => {
    setAnswer({ ...answered, [id]: value });
  };

  const handleReset = () => setAnswer({});

  const handleSubmit = () => {
    const answers = Object.entries(answered);
    const isAllAnswered = answers.length === questions.count;
    const isAllValid = answers.every(([_, answer]) => answer && answer.length);

    if (!isAllAnswered || !isAllValid) {
      setOpen(true);
    } else {
      confirmAnswer(answered);
      history.push('/result');
      setAnswer({});
    }
  };

  const handleDecline = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmAnswer(answered);
    history.push('/result');
    setAnswer({});
  };

  const renderQuestions = ({ id, type, text, options }) => {
    let field;

    switch (type) {
      case FIELD_TYPES.TEXT:
        field = (
          <Text text={text} key={id} onChange={setAnswerById(id)} value={answered[id]} />
        );
        break;
      case FIELD_TYPES.MULTI:
        field = (
          <Checkbox
            text={text}
            options={options}
            key={id}
            onChange={setAnswerById(id)}
            value={answered[id]}
          />
        );
        break;
      case FIELD_TYPES.RADIO:
        field = (
          <Radio
            text={text}
            options={options}
            key={id}
            onChange={setAnswerById(id)}
            value={answered[id]}
          />
        );
        break;
      case FIELD_TYPES.SELECT:
        field = (
          <Select
            text={text}
            options={options}
            key={id}
            onChange={setAnswerById(id)}
            value={answered[id]}
          />
        );
        break;
      default:
        field = null;
        break;
    }

    return field;
  };

  if (fetching) {
    return <CircularProgress />;
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Тест на тему "Статуя Свободы"
            </Typography>
            {questions.list.map(question => renderQuestions(question))}
            <div className={classes.button}>
              <Button variant="outlined" color="secondary" onClick={handleReset}>
                Сброс
              </Button>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Продолжить
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
      <ConfirmDialog open={open} onClose={handleDecline} onConfirm={handleConfirm} />
    </>
  );
};

export default QuestionsList;
