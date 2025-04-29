import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { env } from 'environment/env';
import { useEffect, useState } from 'react';
import { useSessionState } from './store';
import { useIdleTimer } from 'react-idle-timer';

export const IdleTimer = ({ children }: { children: any }) => {
  // Set timeout values
  const timeout = 1000 * 30 * env.IDLE_TIMEOUT;
  const promptBeforeIdle = 1000 * 10;

  // Modal open state
  const [showModal, setShowModal] = useState(false);
  const logout = useSessionState(x => x.logout);

  // Time before idle
  const [remaining, setRemaining] = useState(0);

  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt.
    // All events are disabled while the prompt is active.
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setShowModal(true);
    setRemaining(promptBeforeIdle);
    console.log('onPrompt');
  };

  const onIdle = async () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    console.log('onIdle');
    //alert("SALIO")
    logout();
    setShowModal(false);
    setRemaining(0);
  };

  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()`
    // is true. Here you will also want to close your modal and perform
    // any active actions.
    setShowModal(false);
    setRemaining(0);
  };

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptBeforeIdle,

    onPrompt,
    onIdle,
    onActive,
    startOnMount: true,
  });

  const handleStillHere = () => {
    setShowModal(false);
    activate();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        //setRemaining(Math.ceil(getRemainingTime() / 1000));
        const remainingTime = Math.ceil(getRemainingTime() / 1000);
        console.log('remainingTime', remainingTime);

        setRemaining(remainingTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime, isPrompted]);

  return (
    <>
      <Dialog
        open={showModal}
        onClose={() => setRemaining(1000)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>¿Sigues aquí?</DialogTitle>
        <DialogContent id="alert-dialog-title">
          <DialogContentText id="alert-dialog-description">
            {`Se cerrará la sesión automáticamente en ${remaining} segundos`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStillHere}>Sigo aqui</Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
};
