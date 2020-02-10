import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import QuestionsList from './components/QuestionsList';
import Result from './components/Result';

const useStyles = makeStyles(theme => ({
  app: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function App() {
  const classes = useStyles();

  const [userAnswers, setAnswers] = useState(null);

  const handleConfirm = answers => {
    setAnswers(answers);
  };

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <QuestionsList confirmAnswer={handleConfirm} />
          </Route>
          <Route exact path="/result">
            <Result userAnswers={userAnswers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
