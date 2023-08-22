import * as React from "react";
import Genre from "../genre/Genre";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleHowToPlay from "../howToPlay/toggleHowTo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../app/App.css"


const defaultTheme = createTheme({
    components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none"
        }
    }}},
});


const Homepage = ({ setScenario, setActions, navigate, setImgClass }) => {
  return (
    <body>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              className="hometitle"
              component="h1"
              variant="h2"
              align="center"
              fontFamily={'Handjet, cursive'}
              fontSize={80}
              gutterBottom
            >
              Infinity Trails
            </Typography>
            <Typography
              className="intro"
              variant="h5"
              align="center"
              color="text.secondary"
              fontFamily={'Handjet, cursive'}
              fontSize={40}
              paragraph
            >
              Welcome to your next adventure
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <div className="genre" height="80vh">
                <Genre
                  setScenario={setScenario}
                  setActions={setActions}
                  navigate={navigate}
                  setImgClass={setImgClass}
                />
              </div>
            </Stack>
          </Container>
        </Box>
      </Box>
      <div className="content">
          <ToggleHowToPlay></ToggleHowToPlay>
        </div>
    </ThemeProvider>
    </body>
  );
};

export default Homepage;
