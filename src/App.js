import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingsList from "./components/TrainingsList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

import { ThemeProvider, createTheme } from "@mui/material/styles";

// import "./App.css";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">Trainer App</Typography>

          <Stack direction="row" spacing={2} margin="auto">
            <Button variant="contained" color="inherit" size="large" href="/">
              Customers
            </Button>

            <Button
              variant="contained"
              size="large"
              color="inherit"
              href="/trainings"
            >
              Trainings
            </Button>
          </Stack>
  
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingsList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default App;
