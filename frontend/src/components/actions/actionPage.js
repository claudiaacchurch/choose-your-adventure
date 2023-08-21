import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import "../app/App.css"
import Typography from "@mui/material/Typography";
import Sound from "react-sound";
import FantasyMusic from "../../music/FantasyMusic.mp3";
import NoirMusic from "../../music/NoirMusic.mp3";
import SpaceMusic from "../../music/SpaceMusic.mp3";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
// import Switch from '@mui/material/Switch';
// import CustomSlider from './CustomSlider'; 
// import Container from '@mui/material/Container';

const ActionPage = ({
  setScenario,
  setActions,
  setStatus,
  actions,
  scenario,
  status,
  navigate,
  genre,
  imgClass
}) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  // const [musicPlayStatus, setMusicPlayStatus] = useState(Sound.status.Playing);
  // const toggleMusicPlay = () => {
  //   setMusicPlayStatus(
  //     musicPlayStatus === Sound.status.PLAYING
  //     ? Sound.status.PAUSED
  //     : Sound.status.PLAYING
  //   );
  // };

  
  console.log("action", selectedAction);

  const selectAction = (e) => {
    e.preventDefault();
    setSelectedAction(e.target.value);
  };

  useEffect(() => {
    if (selectedAction !== "") {
      setLoading(true);
      actionApirequest();
    }
  }, [selectedAction]);

  useEffect(() => {
    if (scenario === "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [scenario]);

  const actionApirequest = async () => {
    fetch("http://localhost:8080/action", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: selectedAction }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
      setStatus(data.response.status);
      setLoading(false);
    });
  };

  const startAgain = () => {
    setStatus("Continue");
    setSelectedAction("");
    setScenario("");
    navigate("/");
  };

  useEffect(() => {
      if (imgClass === "fantasy") {
        setMusicUrl(FantasyMusic);
      } else if (imgClass === "noir") {
        setMusicUrl(NoirMusic);
      } else {
        setMusicUrl(SpaceMusic);
      }
    }, [genre]);

  return (
    <>
    <Sound
      url={musicUrl}
      playStatus={Sound.status.PLAYING}
      loop={true}
      />
      {loading ? (
          <Box
          sx={{
            height:" 100vh",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }} >
          <PacmanLoader
            color="yellow"
            loading={loading}
            size={25}
            speedMultiplier={2}
            alignItems="center"
            justifyContent="center"
            aria-label="Pacman Spinner"
            className="loader"
          />
        </Box>
      ) : (
        <Box
        className={imgClass}
        sx={{
          height:" 100vh",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "handjet, cursive",
        }} >
        <div>
            <Typography
              mt="6%"
              className="actionpagetitle"
              component="h1"
              variant="h2"
              align="center"
              fontFamily={'Handjet, cursive'}
              fontSize={80}
              gutterBottom
            >
              Infinity Trails
            </Typography>
          <div className="scenario"> 
            <Typography
              fontSize={25}              
              align="center"
              fontFamily={'Handjet, cursive'}
              >{scenario}</Typography>
          </div>
          {status !== "Continue" ? (
            <div>
              {status === "Game Over" ? (
                <p className="game-end">Game Over</p>
              ) : (
                <p className="game-end">Congratulations! You Won!</p>
              )}
            </div>
          ) : (
            <Box className="actionbuttons" sx ={{  
            display:"flex",
            flexWrap:"wrap",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"
          }}>
                <Button
                  sx ={{
                    width:"20vw",
                    border: 1,
                    borderColor: "blue",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    m: 1,
                    fontSize: "20px",              
                    align: "center",
                    fontFamily: "Handjet, cursive",
                    backgroundColor: "black"
                  }}
                  className="action1-btn"
                  variant="text"
                  value={`${actions[0]}`}
                  onClick={selectAction}
                >
                  {actions[0]}
                </Button>
                <Button
                  sx ={{
                    width:"20vw",
                    border: 1,
                    borderColor: "blue",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    m: 1,
                    fontSize: "20px",              
                    align: "center",
                    fontFamily: "Handjet, cursive",
                    backgroundColor: "black"
                  }}
                  className="action2-btn"
                  variant="text"
                  value={`${actions[1]}`}
                  onClick={selectAction}
                >
                  {actions[1]}
                </Button>
                <Button
                  sx ={{
                    width:"20vw",
                    border: 1,
                    borderColor: "blue",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    m: 1,
                    fontSize: "20px",              
                    align: "center",
                    fontFamily: "Handjet, cursive",
                    backgroundColor: "black"
                  }}
                  className="action3-btn"
                  variant="text"
                  value={`${actions[2]}`}
                  onClick={selectAction}
                >
                  
                  {actions[2]}
                </Button>
    
            </Box>
          )}
          <Box sx ={{  
            display:"flex",
            flexWrap:"wrap",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"}}>
          <div>
            <Button
              className="start-again-btn"
              sx ={{
                border: 1,
                borderColor: "red",
                borderRadius: "20px",
                m: 5,
                fontSize: "20px",              
                align: "center",
                fontFamily: "Handjet, cursive",
                backgroundColor: "black",
              }}
              variant="text"
              color="success"
              onClick={startAgain}
            >
              Start A New Game
            </Button>
          </div>
        
          </Box>
        </div>
      
        </Box>
      )}
      </>
  );
};

export default ActionPage;
