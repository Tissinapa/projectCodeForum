import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Logout from './Logout';


//App bar where user can navigate 
function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar component="nav">
      <Toolbar>
        <Link to="/">
          <Button variant="contaned" color="inherit" sx={{m: 0.1}}>Home</Button>
        </Link>
        <Link to="/login">
          <Button variant="contaned" color="inherit" sx={{m: 0.1}}>Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="contaned" color="inherit" sx={{m: 0.1}}>Register</Button>
        </Link>
        <Logout></Logout>
      </Toolbar>
    </AppBar>
    
    
  </Box>
  )
}

export default Header