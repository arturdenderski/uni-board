import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Typography, Button, Container, Box, TextField } from "@mui/material";
import ProfilePage from "./views/ProfilePage";
import { SearchPage } from "./views/SearchPage";

function App() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
    >
      {/* <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", paddingTop: "20vh" }}>
          <Typography variant="h3" gutterBottom>
            UNIBOARD
          </Typography>
          <Typography variant="body1" paragraph>
            An open-source bulletin board for university students
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Container> */}

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
