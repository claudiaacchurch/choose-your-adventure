import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
} from "../genre/StyledComponents";
import characterConfigs from "../genre/CharacterConfiguration";

const Character = ({
  characterImages,
  setCharacter,
  genre,
  giveGenreValue,
}) => {
  const giveCharacterValue = (event) => {
    event.preventDefault();
    const characterTitle = event.target.innerText;
    const genreConfigs = characterConfigs[genre];
    const characterDescription = genreConfigs[characterTitle];
    setCharacter(characterDescription);
  };

  return (
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
  );
};

export default Character;
