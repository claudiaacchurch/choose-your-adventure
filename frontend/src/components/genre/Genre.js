import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
} from "./StyledComponents";
import {
  fantasyCharacterImages,
  spaceCharacterImages,
  noirCharacterImages,
} from "./CharacterImages";
import Difficulty from "../difficulty/Difficulty";
import Character from "../Character/Character";
import StartNewGame from "../startNewGame/startNewGame";

const genreImages = [
  {
    url: "https://images.unsplash.com/photo-1461397932544-11132a69bf46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Fantasy Adventure",
    width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
    title: "Space Horror",
    width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Detective Noir",
    width: "100%",
  },
];

const Genre = ({ navigate, setScenario, setActions, setImgClass }) => {
  const [genre, setGenre] = useState("");
  const [character, setCharacter] = useState("");
  const [characterImages, setCharacterImages] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  const giveGenreValue = (e) => {
    if (e.target.innerText === "START A NEW GAME") {
      setCharacter("");
      setGenre("");
    } else {
      setGenre(e.target.innerText);
    }
  };

  useEffect(() => {
    if (difficulty !== "") {
      apirequest();
    }
  }, [difficulty]);

  useEffect(() => {
    if (genre !== "") {
      if (genre === "Fantasy Adventure") {
        setImgClass("fantasy");
        setCharacterImages(fantasyCharacterImages);
      } else if (genre === "Detective Noir") {
        setImgClass("noir");
        setCharacterImages(noirCharacterImages);
      } else if (genre === "Space Horror") {
        setImgClass("space");
        setCharacterImages(spaceCharacterImages);
      } else {
        navigate("/");
      }
    }
  }, [genre]);

  const apirequest = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/genre`, {
      mode: "cors",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        genre: genre,
        character: character,
        difficulty: difficulty,
      }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
    });

    navigate("/action");
  };

  if (genre === "") {
    return (
      <>
        <Typography
          className="choosegenre"
          variant="h5"
          align="center"
          color="text.secondary"
          position="left"
          fontFamily={"Handjet, cursive"}
          paragraph
          sx = {{
            fontSize:{xs:25, sm:30, md:40},
          }}
        >
          Choose Genre
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            width: {xs: "90vw", sm:"90vw", md:"70vw"},
          height: {xs: "20vh", sm:"30vh", md:"40vh"},
          }}
        >
          {genreImages.map((image) => (
            <ImageButton
              className="genreimages"
              focusRipple
              key={image.title}
              onClick={giveGenreValue}
              style={{
                width: image.width,
                height: "100%",
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  className={`${image.title}-btn`}
                  component="span"
                  variant="subtitle1"
                  color="yellow"
            
                  fontFamily={"Handjet, cursive"}
                  sx={{
                    fontSize:{xs:20, sm:25, md:35},
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </>
    );
  }
  if (character === "") {
    return (
      <>
        <Character
          characterImages={characterImages}
          setCharacter={setCharacter}
          genre={genre}
          giveGenreValue={giveGenreValue}
        ></Character>
        <StartNewGame giveGenreValue={giveGenreValue}></StartNewGame>
      </>
    );
  }
  if (difficulty === "") {
    return (
      <>
        <Difficulty
          setDifficulty={setDifficulty}
          genre={genre}
          giveGenreValue={giveGenreValue}
        ></Difficulty>
        <StartNewGame giveGenreValue={giveGenreValue}></StartNewGame>
      </>
    );
  }
};

export default Genre;
