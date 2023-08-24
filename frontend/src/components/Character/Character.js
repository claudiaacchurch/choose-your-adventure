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
        paragraph
        sx = {{
          fontSize:{xs:25, sm:30, md:40},
        }}
      >
        Choose Your Character
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
};

export default Character;
