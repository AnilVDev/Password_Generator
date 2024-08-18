import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { deletePassword, getAllPassword } from '../Slice/passwordSlice';
import toast from 'react-hot-toast';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

  
  
  function SavedPasswords() {
    const {passwordDetails} = useSelector( state => state.password) || {};
    const dispatch = useDispatch()

    const [visiblePasswords, setVisiblePasswords] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPasswordId, setSelectedPasswordId] = useState(null);
  
    const handleDeleteClick = (id) => {
      setSelectedPasswordId(id);
      setDialogOpen(true);
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
      setSelectedPasswordId(null);
    };

    const handleConfirmDelete = () => {
      if (selectedPasswordId) {
        dispatch(deletePassword(selectedPasswordId))
          .then(() => {
            dispatch(getAllPassword());
            toast.success('Successfully deleted');
            handleDialogClose();
          })
          .catch((error) => {
            toast.error('Failed to delete');
            handleDialogClose();
          });
      }
    };

    useEffect(() => {
      dispatch(getAllPassword())
    },[dispatch])

    useEffect(() => {
      if (passwordDetails && Array.isArray(passwordDetails)) {
          setVisiblePasswords(Array(passwordDetails.length).fill(false));
      }
    }, [passwordDetails]);

    const toggleVisibility = (index) => {
      setVisiblePasswords((prev) =>
        prev.map((isVisible, i) => (i === index ? !isVisible : isVisible))
      );
    };

  if (!passwordDetails || passwordDetails.length === 0) {
        return <Typography>No passwords saved yet.</Typography>;
    }

    const handleClipboard = async(password) => {
      if (password) {
          await navigator.clipboard.writeText(password);
          toast.success('Copied to your clipboard');
      } else {
      toast.error('No password to copy');
      }
  }  

  return (
    <>
    <Grid container direction="column" spacing={2}>
      {passwordDetails.map((entry, index) => (
        <Grid item key={index} >
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#2E2E2E', color: '#fff' }}>
            <Typography variant="h6">
            Password: 
              {visiblePasswords[index] ? entry.password : '********'}
              <IconButton
                aria-label="toggle visibility"
                onClick={() => toggleVisibility(index)}
                sx={{ color: '#2196f3' }}
              >
                {visiblePasswords[index] ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
                <Button onClick={() => handleClipboard(entry.password)}><ContentCopyIcon sx={{ color: '#dd2c00' }}/></Button>
            </Typography>
            <Typography variant="subtitle1">Website: {entry.website}</Typography>
            <Typography variant="body2">Notes: {entry.notes}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteClick(entry.id)}
              sx={{ color: '#f50057' }}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this password?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default SavedPasswords;