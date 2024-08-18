import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Login from "../Component/Login";
import Signup from "../Component/Signup";
import { useLocation, useNavigate } from "react-router-dom";




function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }




function SingInOutContainer(){
    const paperStyle = {width:340, margin:"20px auto"}
    const [value,setValue] = useState()
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
      if (location.pathname === '/signup') {
        setValue(1);
      } else {
        setValue(0);
      }
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
      setValue(newValue);

      if (newValue === 0) {
        navigate('/login');
      } else {
        navigate('/signup');
      }
      };

    return(
        <Paper elevation={10} style={paperStyle}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0} >
                <Login handleChange={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <Signup/>
            </TabPanel>
        </Paper>
    )
}
export default SingInOutContainer;