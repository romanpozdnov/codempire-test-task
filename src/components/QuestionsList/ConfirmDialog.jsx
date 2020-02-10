import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({ open, onConfirm, onClose }) => (
  <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onClose}>
    <DialogTitle id="alert-dialog-slide-title">
      Вы уверены, что хотите продолжить?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Каждый неотвеченный ответ считается неправильным!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Нет
      </Button>
      <Button onClick={onConfirm} color="primary">
        Да
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
