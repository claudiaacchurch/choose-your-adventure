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

const Difficulty = ({ setDifficulty, genre, giveGenreValue }) => {
  const difficultyImages = [
    {
      url: "https://cdn.pixabay.com/photo/2019/08/31/22/19/landscape-4444133_1280.jpg",
      title: "Easy",
      width: "100%",
    },
    {
      url: "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_1280.png",
      title: "Medium",
      width: "100%",
    },
    {
      url: "https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788_1280.jpg",
      title: "Hard",
      width: "100%",
    },
  ];

  const giveDifficultyValue = (event) => {
    event.preventDefault();
    const difficultyTitle = event.target.innerText;
    if (genre === "Fantasy Adventure") {
      if (difficultyTitle === "Easy") {
        setDifficulty(
          "easy. There's a lower chance of a fatal action and a higher chance of winning."
        );
      }
      if (difficultyTitle === "Medium") {
        setDifficulty(
          "medium. There's an equal chance of picking a fatal action or picking a winning action."
        );
      }
      if (difficultyTitle === "Hard") {
        setDifficulty(
          "hard. There's a higher chance of a fatal action and a lower chance of winning."
        );
      }
    }
    if (genre === "Detective Noir") {
      if (difficultyTitle === "Easy") {
        setDifficulty(
          "easy. There's a lower chance of a fatal action and a higher chance of winning."
        );
      }
      if (difficultyTitle === "Medium") {
        setDifficulty(
          "medium. There's an equal chance of picking a fatal action or picking a winning action."
        );
      }
      if (difficultyTitle === "Hard") {
        setDifficulty(
          "hard. There's a higher chance of a fatal action and a lower chance of winning."
        );
      }
    }
    if (genre === "Space Horror") {
      if (difficultyTitle === "Easy") {
        setDifficulty(
          "easy. There's a low chance of a fatal action and a high chance of winning."
        );
      }
      if (difficultyTitle === "Medium") {
        setDifficulty(
          "medium. There's an equal chance of picking a fatal action or picking a winning action."
        );
      }
      if (difficultyTitle === "Hard") {
        setDifficulty(
          "hard. There's a higher chance of a fatal action and a lower chance of winning."
        );
      }
    }
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
        Choose Level of Difficulty
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
        {difficultyImages.map((image) => (
          <ImageButton
            className="difficultyimages"
            focusRipple
            key={image.title}
            onClick={giveDifficultyValue}
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

export default Difficulty;
