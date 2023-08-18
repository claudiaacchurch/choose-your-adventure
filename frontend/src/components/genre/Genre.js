import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const genreImages = [
  {
    url: "https://images.unsplash.com/photo-1550100136-e092101726f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    title: "Fantasy",
    value: "fantasy",
    width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
    title: "Space",
    value: "space",
    width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Noir",
    value: "noir",
    width: "100%",
  },
];

const characterImages = [
  {
    url: "https://cdn.pixabay.com/photo/2016/08/16/10/18/dragon-1597583_1280.png",
    title: "Ethan",
    value: "Ethan",
    width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/08/16/10/18/dragon-1597583_1280.png",
    title: "Lydia",
    value: "Lydia",
    width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/08/16/10/18/dragon-1597583_1280.png",
    title: "Dave",
    value: "Dave",
    width: "100%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "40%",
  border: "2px",
  borderColor: "yellow",
  borderStyle: "solid",
  margin: "0 2%",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const Genre = ({ navigate, setScenario, setActions }) => {
  const [genre, setGenre] = useState("");
  const [character, setCharacter] = useState("");

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.innerText);
  };

  const giveCharacterValue = (e) => {
    e.preventDefault();
    setCharacter(e.target.innerText);
  };

  useEffect(() => {
    if (character !== "") {
      apirequest();
    }
  }, [character]);

  const apirequest = async () => {
    fetch("http://localhost:8080/genre", {
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
              classname="genreimages"
              focusRipple
              key={image.title}
              onClick={giveGenreValue}
              value={image.title}
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
      ) : (
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
              classname="characterimages"
              focusRipple
              key={image.title}
              onClick={giveCharacterValue}
              value={image.title}
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
      )}
    </>
  );
};

/*

Type: Rogue
Personality Traits: Mysterious, agile, quick-witted

Type: Investigator
Personality Traits: Analytical, resourceful, determined

Type: Explorer
Personality Traits: Adventurous, inquisitive, fearless
*/

export default Genre;
