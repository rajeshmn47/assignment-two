import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { SettingsBackupRestoreSharp } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Edit({open,setOpen,edititem,setUsers,page}) {
    const [email,setEmail]=useState()
useEffect(()=>{
setEmail(edititem?.email)
},[edititem])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = async(editdata) => {
    const dear=await axios.get(`https://assignmentrajesh.herokuapp.com/user/edituser/${edititem._id}`)
    console.log(dear)
    const d=await axios.post(`https://assignmentrajesh.herokuapp.com/user/edituser/${edititem._id}`,{email:email})
    const data=await axios.get(`https://assignmentrajesh.herokuapp.com/user/getallusers/?page=${page}`)
setUsers(data.data.users)
    setOpen(false);
  };

  return (
    <div style={{width:'40vw'}}>
   
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit Email
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
         {edititem?.name}
          </Typography>
          <Typography gutterBottom>
        <TextField value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </Typography>
          <Typography gutterBottom>
           {edititem?.createdat}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleChange} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}