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
import characterConfigs from "./CharacterConfiguration";
import {
  fantasyCharacterImages,
  spaceCharacterImages,
  noirCharacterImages,
} from "./CharacterImages";

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

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.innerText);
  };

  const giveCharacterValue = (event) => {
    event.preventDefault();
    const characterTitle = event.target.innerText;
    const genreConfigs = characterConfigs[genre];
    const characterDescription = genreConfigs[characterTitle];
    setCharacter(characterDescription);
  };

  useEffect(() => {
    if (character !== "") {
      apirequest();
    }
  }, [character]);

  useEffect(() => {
    if (genre !== "") {
      if (genre === "Fantasy Adventure") {
        setImgClass("fantasy");
        setCharacterImages(fantasyCharacterImages);
      } else if (genre === "Detective Noir") {
        setImgClass("noir");
        setCharacterImages(noirCharacterImages);
      } else {
        setImgClass("space");
        setCharacterImages(spaceCharacterImages);
      }
    }
  }, [genre]);

  const apirequest = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/genre`, {
      mode: "cors",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: genre, character: character }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
    });
    navigate("/action");
  };

  return (
    <>
      {genre === "" ? (
        <>
          <Typography
            className="choosegenre"
            variant="h5"
            align="center"
            color="text.secondary"
            position="left"
            fontFamily={"Handjet, cursive"}
            fontSize={40}
            paragraph
          >
            Choose Genre
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "70vw",
              height: "40vh",
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
                    fontSize={35}
                    fontFamily={"Handjet, cursive"}
                    sx={{
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
      ) : (
        <>
          <Typography
            className="choosegenre"
            variant="h5"
            align="center"
            color="text.secondary"
            position="left"
            fontFamily={"Handjet, cursive"}
            fontSize={40}
            paragraph
          >
            Choose Your Character
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "70vw",
              height: "40vh",
            }}
          >
            {characterImages.map((image) => (
              <ImageButton
                className="characterimages"
                focusRipple
                key={image.title}
                onClick={giveCharacterValue}
                style={{
                  width: image.width,
                  height: "100%",
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="yellow"
                    fontSize={35}
                    fontFamily={"Handjet, cursive"}
                    sx={{
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
      )}
    </>
  );
};

export default Genre;
