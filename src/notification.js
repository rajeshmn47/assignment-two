import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export default function Notify({notifyopen,setNotifyopen}) {

  const handleClick = () => {
    setNotifyopen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotifyopen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notifyopen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Edited successfully"
        action={
          <React.Fragment>
            <Button color="primary" size="small" onClick={handleClose}>
              ok
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CheckIcon/>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}