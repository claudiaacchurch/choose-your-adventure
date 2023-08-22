import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const genreImages = [
  {
    url: "https://images.unsplash.com/photo-1461397932544-11132a69bf46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Fantasy Adventure", width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
    title: "Space Horror", width: "100%",
  },
  {
    url: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Detective Noir", width: "100%",
  },
];

const characterImages = [
  {
    url: "https://cdn.pixabay.com/photo/2022/10/12/21/33/scientist-7517566_1280.jpg",
    title: "Smart", width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/12/04/14/24/warrior-3855706_1280.jpg",
    title: "Strong", width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/10/04/17/49/princess-jasmine-7498756_1280.jpg",
    title: "Charismatic", width: "100%",
  },
];

const difficultyImages = [
  {
    url: "https://cdn.pixabay.com/photo/2019/08/31/22/19/landscape-4444133_1280.jpg",
    title: "Easy", width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_1280.png",
    title: "Medium", width: "100%",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788_1280.jpg",
    title: "Hard", width: "100%",
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
      border: "0px solid currentColor",
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

const Genre = ({
  navigate,
  setScenario,
  setActions,
  setImgClass,
}) => {
  const [genre, setGenre] = useState("");
  const [character, setCharacter] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.innerText);
  };

  const giveCharacterValue = (event) => {
    event.preventDefault();
    const characterTitle = event.target.innerText;
    if (genre === "Fantasy Adventure") {
      if (characterTitle === "Strong") {
      setCharacter("fighter whose goal is to try and save someone.");
      }
      if (characterTitle === "Smart") {
        setCharacter("wizard whose goal is to try and find magic item.");
      }
      if (characterTitle === "Charismatic") {
        setCharacter("bard whose goal is to try and make a friend.");
      }
    }
    if (genre === "Detective Noir") {
      if (characterTitle === "Strong") {
      setCharacter("boxer whose goal is to try and find love.");
      }
      if (characterTitle === "Smart") {
        setCharacter("detective whose goal is to try and solve a mystery.");
      }
      if (characterTitle === "Charismatic") {
        setCharacter("femme fatale whose goal is to try and steal something expensive.");
      }
    }
    if (genre === "Space Horror") {
      if (characterTitle === "Strong") {
      setCharacter("mechanic whose goal is to try and fix the aircraft and save the crew.");
      }
      if (characterTitle === "Smart") {
        setCharacter("scientist whose goal is to try and find a new planet to inhabit.");
      }
      if (characterTitle === "Charismatic") {
        setCharacter("diplomat whose goal is to try and make peace with aliens.");
      }
    }
    
  };

  const giveDifficultyValue = (event) => {
    event.preventDefault();
    const difficultyTitle = event.target.innerText;
    if (genre === "Fantasy Adventure") {
      if (difficultyTitle === "Easy") {
      setDifficulty("This is an easy level. The challenges you'll face are relatively simple and straightforward. There's a high chance of winning.");
      }
      if (difficultyTitle === "Medium") {
        setDifficulty("This is a medium level. You'll encounter moderate challenges that require careful decision-making. There's a good chance of winning.");
      }
      if (difficultyTitle === "Hard") {
        setDifficulty("This is a hard level. Be prepared for tough challenges that will test your skills and wit. There's a challenging but rewarding chance of winning.");
      }
    }
    if (genre === "Detective Noir") {
      if (difficultyTitle === "Easy") {
        setDifficulty("This is an easy level. The mysteries you'll solve are straightforward, and clues are easier to find. There's a high chance of solving the case");
      }
      if (difficultyTitle === "Medium") {
        setDifficulty("This is a medium level. The mysteries are more intricate, and your deductive skills will be put to the test. There's a solid chance of solving the case.");
      }
      if (difficultyTitle === "Hard") {
        setDifficulty("This is a hard level The mysteries are complex and require sharp observation and reasoning. There's a challenging but some chance of solving the case.");
      }
    }
    if (genre === "Space Horror") {
      if (difficultyTitle === "Easy") {
        setDifficulty("This is an easy level. Surviving the horrors of space will be less hard. There's a high chance of making it back to win.");
      }
      if (difficultyTitle === "Medium") {
        setDifficulty("This is a medium level. Space is dangerous, and your resourcefulness will be tested. There's a solid chance of overcoming the challenges.");
      }
      if (difficultyTitle === "Hard") {
        setDifficulty("This is a hard level. Space is merciless, and every decision counts. There's a challenging but heroic chance of making it through.");
      }
    }
    
  };


  // useEffect(() => {
  //   if (character !== "") {
  //     apirequest();
  //   }
  // }, [character]);

  useEffect(() => {
    if (genre !== "") {
      if (genre === "Fantasy Adventure") {
        setImgClass("fantasy");
      } else if (genre === "Detective Noir") {
        setImgClass("noir");
      } else {
        setImgClass("space");
      }
    }
  }, [genre]);

  useEffect(() => {
    if (difficulty !== "") {
      apirequest();
    }
  }, [difficulty]);
  

  const apirequest = async () => {
    fetch(`${process.env.REACT_APP_API_URL}/genre`, {
      mode: 'cors',
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: genre, character: character, difficulty: difficulty }),
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            width: "70vw",
            height: "40vh",
          }}
        >
          <Typography
              className="choosegenre"
              variant="h5"
              align="center"
              color="text.secondary"
              position="left"
              fontFamily={'Handjet, cursive'}
              fontSize={40}
              paragraph
            >
              Choose Genre
            </Typography>
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
    )
  }
  if (character === "") {
    return (
      <>
        {(
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "70vw",
              height: "40vh",
            }}
          >
            <Typography
                className="choosegenre"
                variant="h5"
                align="center"
                color="text.secondary"
                position="left"
                fontFamily={'Handjet, cursive'}
                fontSize={40}
                paragraph
              >
                Choose Your Best Trait
              </Typography>
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
        )}
      </>
    );
  }
  if (difficulty === ""){
    return (
      <>
      {(
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            width: "70vw",
            height: "40vh",
          }}
        >
          <Typography
              className="choosegenre"
              variant="h5"
              align="center"
              color="text.secondary"
              position="left"
              fontFamily={'Handjet, cursive'}
              fontSize={40}
              paragraph
            >
              Choose Level of Difficulty
            </Typography>
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
      )}
    </>
    )
  }
};

export default Genre;
