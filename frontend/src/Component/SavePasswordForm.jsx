import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { reset, savePassword } from '../Slice/passwordSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function SavePasswordForm({ password, open, setOpen }) {
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, isSuccess, message } = useSelector(state => state.password)


  const handleClose = () => {
    setOpen(false);
  };
    const handleSave = (e) => {
      e.preventDefault()

      const passwordDetails = {
        website,
        notes,
        password
      }
      dispatch(savePassword(passwordDetails))
    };

    useEffect(() => {
      if(isError){
        toast.error(message)
      }
      if (isSuccess) {      
        toast.success("Password Details Saved")
        navigate('/saved')
      }
      dispatch(reset())
    }, [isError, isSuccess, message])

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Website"
            variant="outlined"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required 
          />
        </Grid>
        <Grid item>
          <TextField
            label="Notes"
            variant="outlined"
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            readOnly
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save Password
          </Button>
        </Grid>
      </Grid>

        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default SavePasswordForm;
  