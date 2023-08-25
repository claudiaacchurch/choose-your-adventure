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


const Homepage = ({ setScenario, setActions, navigate, setImgClass, setSessionID, sessionID }) => {
  return (
    <body>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              className="hometitle"
              component="h1"
              variant="h2"
              align="center"
              fontFamily={'Handjet, cursive'}
              gutterBottom
              sx = {{
                fontSize:{xs: 50, sm:60, md:80},
              }}
            >
              Infinity Trails
            </Typography>
            <Typography
              className="intro"
              variant="h5"
              align="center"
              color="text.secondary"
              fontFamily={'Handjet, cursive'}
              paragraph
              sx = {{
                fontSize:{xs: 25, sm:30, md:40},
              }}
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
                  sessionID={sessionID} 
                  setSessionID={setSessionID}
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
