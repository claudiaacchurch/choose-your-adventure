import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";
import "../app/App.css";
import Typography from "@mui/material/Typography";
import Sound from "react-sound";
import FantasyMusic from "../../music/FantasyMusic.mp3";
import NoirMusic from "../../music/NoirMusic.mp3";
import SpaceMusic from "../../music/SpaceMusic.mp3";
import Slider from "@mui/material/Slider";
import volumeImage from "./volumeImage.png";
import messageLoad from "./loading_messages";

var randomElement = messageLoad[Math.floor(Math.random() * messageLoad.length)];

const ActionPage = ({
  setScenario,
  setActions,
  setStatus,
  actions,
  scenario,
  status,
  navigate,
  genre,
  imgClass,
}) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");
  const [musicVolume, setMusicVolume] = useState(20);

  const selectAction = (e) => {
    e.preventDefault();
    setSelectedAction(e.target.value);
  };

  useEffect(() => {
    if (selectedAction !== "") {
      randomElement =
        messageLoad[Math.floor(Math.random() * messageLoad.length)];
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
    fetch(`${process.env.REACT_APP_API_URL}/action`, {
      mode: "cors",
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

  let handleSliderChange = (event, newValue) => {
    setMusicVolume(newValue);
  };

  return (
    <>
      <Sound
        url={musicUrl}
        playStatus={Sound.status.PLAYING}
        loop={true}
        volume={musicVolume}
      />

      {loading ? (
        <Box
          sx={{
            height: " 100vh",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <RingLoader
            color="yellow"
            loading={loading}
            size={80}
            speedMultiplier={2}
            alignItems="center"
            justifyContent="center"
            aria-label="Infinity Spinner"
            className="loader"
          />

          <Typography
            mt="2%"
            className="loadingText"
            component="h4"
            variant="h2"
            align="center"
            fontFamily={"Handjet, cursive"}
            fontSize={30}
            gutterBottom
          >
            {randomElement}
          </Typography>
        </Box>
      ) : (
        <>
         <Box
  className={imgClass}
  sx={{
    position: "relative",
    height: { xs: "auto", sm: "auto", md:"100vh" },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "handjet, cursive",
  }}
>
            <Box
              className="volume"
              sx={{
                position: "absolute",
                top: "5%",
                right: "80%",
                height: " 100vh",
                display: "inline-flex",
              }}
            >
              <img
                src={volumeImage}
                alt="volume"
                style={{
                  width: 25,
                  height: 25,
                  color: "blue",
                  paddingRight: "2%",
                }}
              />
              <Slider
                size="small"
                value={musicVolume}
                marks
                min={0}
                max={100}
                onChange={handleSliderChange}
                sx={{
                  width: 100,
                  color: "blue",
                  alignItems: "flex-start",
                }}
              />
            </Box>
            <div>
              <Typography
                mt="2%"
                className="actionpagetitle"
                component="h1"
                variant="h2"
                align="center"
                fontFamily={"Handjet, cursive"}
                gutterBottom
                sx = {{
                  fontSize:{xs: 50, sm:60, md:80},
                }}
              >
                Infinity Trails
              </Typography>
              <div className="scenario">
                <Typography
                  align="center"
                  fontFamily={"Handjet, cursive"}
                  sx = {{
                    fontSize:{xs: 20, sm:25, md:25},
                  }}
                >
                  {scenario}
                </Typography>
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
                <Box
                  className="actionbuttons"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{
                      width: "20vw",
                      border: 1,
                      borderColor: "blue",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      m: 1,
                      fontSize:{xs: 15, sm:20, md:20},
                      align: "center",
                      fontFamily: "Handjet, cursive",
                      backgroundColor: "black",
                    }}
                    className="action1-btn"
                    variant="text"
                    value={`${actions[0]}`}
                    onClick={selectAction}
                  >
                    {actions[0]}
                  </Button>
                  <Button
                    sx={{
                      width: "20vw",
                      border: 1,
                      borderColor: "blue",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      m: 1,
                      fontSize:{xs: 15, sm:20, md:20},
                      align: "center",
                      fontFamily: "Handjet, cursive",
                      backgroundColor: "black",
                    }}
                    className="action2-btn"
                    variant="text"
                    value={`${actions[1]}`}
                    onClick={selectAction}
                  >
                    {actions[1]}
                  </Button>
                  <Button
                    sx={{
                      width: "20vw",
                      border: 1,
                      borderColor: "blue",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      m: 1,
                      fontSize:{xs: 15, sm:20, md:20},
                      align: "center",
                      fontFamily: "Handjet, cursive",
                      backgroundColor: "black",
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
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
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
                    onClick={startAgain}
                  >
                    Start A New Game
                  </Button>
                </div>
              </Box>
            </div>
          </Box>
        </>
      )}
    </>
  );
};

export default ActionPage;
