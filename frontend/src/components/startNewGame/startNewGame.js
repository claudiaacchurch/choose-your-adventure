import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const StartNewGame = ({ giveGenreValue }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button
        className="start-again-btn"
        sx={{
          border: 1,
          borderColor: "red",
          borderRadius: "20px",
          m: 5,
          fontSize:{xs: 15, sm:18, md:20},
          align: "center",
          fontFamily: "Handjet, cursive",
          backgroundColor: "black",
        }}
        variant="text"
        color="success"
        onClick={giveGenreValue}
      >
        Start A New Game
      </Button>
    </Box>
  );
};

export default StartNewGame;
