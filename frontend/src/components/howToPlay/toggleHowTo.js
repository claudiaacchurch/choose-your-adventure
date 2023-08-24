import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../app/App.css"

const ToggleHowToPlay = () => {
  const [isContentOpen, setContentOpen] = useState(false);
  const toggleContent = () => {
    setContentOpen(!isContentOpen);
  };
  return (
    <div className="ToggleHowToPlay">
      <Button variant="text" className="toggleButton" onClick={toggleContent} sx={{ fontSize:{xs: 15, sm:20, md:25},
                  fontFamily:'Handjet, cursive'}}>
        {isContentOpen ? "Close" : "How to Play"}
      </Button>
      {isContentOpen && (
        <Typography
        className="content"
        color="inherit"
        fontFamily={'Handjet, cursive'}
          sx = {{
            marginLeft:{xs: 5, sm:10, md:28},
            marginRight:{xs: 5, sm:10, md:28},
            fontSize:{xs: 15, sm:20, md:20},
            mb:{xs: 5, sm:5, md:0},
          }}
        >
          <h4>
            {" "}
            To begin please click one of the three genres to decide what type of
            adventure you want to begin! Then you will have three options to
            choose for your character to take, click on the one that seems best.
            Be sure to choose wisely as any mistake could end in disaster for
            you and end your game.... Enjoy!
          </h4>
        </Typography>
      )}
    </div>
  );
};

export default ToggleHowToPlay;