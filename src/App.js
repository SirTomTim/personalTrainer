import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
function App() {
  return (
    <div className="App">
      <AppBar position="static">
  <Toolbar>
    <Typography>
      Personal Trainer
    </Typography>
  </Toolbar>
</AppBar>
      <Customerlist />
      <Traininglist />
    </div>
  );
}

export default App;
