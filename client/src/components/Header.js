import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import{Link} from "react-router-dom";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Button variant="contaned" color="white">Home</Button>
        </Link>
        <Link to="/login">
          <Button variant="contaned" color="white">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="contaned" color="white">Register</Button>
        </Link>
      </Toolbar>
    </AppBar>
    
    
  </Box>
  )
}

export default Header