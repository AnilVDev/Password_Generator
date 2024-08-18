import { Button, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { getRandomChar, getSpecialChar } from '../utils';
import toast from 'react-hot-toast';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import SavePasswordForm from './SavePasswordForm';
import { useDispatch } from 'react-redux';
import { reset } from '../Slice/passwordSlice';


function Generator() {

    const [result, setResult] = useState('');
    const [length, setLength] = useState(6);
    const [options, setOptions] = useState({
      capital: false,
      small: false,
      number: false,
      symbol: false,
    });
    const [strength, setStrength] = useState(0);
    const [showSaveComponent, setShowSaveComponent] = useState(false);
    const [passwordToSave, setPasswordToSave] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
  

    const fieldsArray = [
        {
          field: options.capital,
          getChar: () => getRandomChar(65, 90),
        },
        {
          field: options.small,
          getChar: () => getRandomChar(97, 122),
        },
        {
          field: options.number,
          getChar: () => getRandomChar(48, 57),
        },
        {
          field: options.symbol,
          getChar: () => getSpecialChar(),
        },
      ];
  
    const handleOptionChange = (event) => {
      setOptions({
        ...options,
        [event.target.name]: event.target.checked,
      });
    };
  
    const handleLengthChange = (event) => {
      setLength(event.target.value);
    };
  
    const generatePassword = (e) => {
      e.preventDefault()
      let gPassword = ''
      const checkedFields =  fieldsArray.filter(({
        field}) => field)

      for (let i = 0; i < length; i++){
        const index =  Math.floor(Math.random() * checkedFields.length)
        const letter = checkedFields[index]?.getChar()

        if (letter){
            gPassword += letter
        }
      }  

      if (gPassword) {
        setResult(gPassword)
        setStrength(calculateStrength(gPassword));
      }else {
        toast.error(' Please select at least one option');
      }
    };

    const calculateStrength = (password) => {
      let strengthScore = 0;

      if (password.length >= 6) strengthScore += 1;  // Length criteria
      if (/[A-Z]/.test(password)) strengthScore += 1;  // Uppercase criteria
      if (/[a-z]/.test(password)) strengthScore += 1;  // Lowercase criteria
      if (/[0-9]/.test(password)) strengthScore += 1;  // Number criteria
      if (/[^A-Za-z0-9]/.test(password)) strengthScore += 1;  // Special character criteria

      return strengthScore;
  };

    const handleClipboard = async() => {
        if (result) {
            await navigator.clipboard.writeText(result);
            toast.success('Copied to your clipboard');
        } else {
        toast.error('No password to copy');
        }
    }
    
    const handleSave = () => {
      setPasswordToSave(result); 
      setShowSaveComponent(true); 
      dispatch(reset())
      setOpen(true) 
    };



  return (  
    <Grid 
        container
        direction="column"
        spacing={2}
        sx={{
        height: '75vh',   
        maxWidth: { xs: '90%', sm: '300px' },
        margin: 'auto',
        padding: 2,
        backgroundColor: '#2E2E2E',
        borderRadius: 2,
        display: 'flex', 
        justifyContent: 'center',
        }}
    >
    <Grid >
      <TextField
        label="Password"
        variant="outlined"
        value = {result}
        InputProps={{
            readOnly: true,
          endAdornment: (
            <Button onClick={handleClipboard}>📋</Button>
          ),
        }}
        fullWidth
        InputLabelProps={{
            sx: { color: '#fff' } 
          }}
        inputProps={{
          style: { color: '#fff' }
        }}
        sx={{
            backgroundColor: '#1C1C1C',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fff', 
              },
              '&:hover fieldset': {
                borderColor: '#fff', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff', 
              },
            },
          }}
      />
    </Grid>
    <Grid >
      <PasswordStrengthMeter strength={strength}/>
    </Grid>

    <Grid>
      <InputLabel style={{ color: '#fff' }}>Length</InputLabel>
      <Select
        value={length}
        onChange={handleLengthChange}
        fullWidth
        sx={{
            backgroundColor: '#1C1C1C',
            color: '#fff',
            '& .MuiSelect-icon': {
              color: '#fff',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#fff',
              },
            },
          }}
      >
        {[...Array(7).keys()].map(i => (
          <MenuItem key={i} value={i + 6}>{i + 6}</MenuItem>
        ))}
      </Select>
    </Grid>

    {['Capital', 'Small', 'Number', 'Symbol'].map(option => (
      <Grid key={option}>
        <FormControlLabel
          control={
            <Checkbox
              checked={options[option.toLowerCase()]}
              onChange={handleOptionChange}
              name={option.toLowerCase()}
              style={{ color: '#fff' }}
            />
          }
          label={<span style={{ color: '#fff' }}>{option}</span>}
        />
      </Grid>
    ))}

    <Grid sx={{my: 1}}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={generatePassword}
        style={{ backgroundColor: '#2A5CD7', color: '#fff' }}
      >
        Generate Password
      </Button>
    </Grid>

    <Grid sx={{my: 1}}>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleSave}
        style={{ backgroundColor: '#dd2c00', color: '#fff' }}
      >
        Save
      </Button>
    </Grid>
    {/* Conditionally render the PasswordSave component */}
    {showSaveComponent && (
      <Grid item>
        <SavePasswordForm password={passwordToSave} open={open} setOpen={setOpen} />
      </Grid>
    )}
  </Grid>


  )
}

export default Generator