import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import PacmanLoader from "react-spinners/PacmanLoader";

const images = [
  {
    url: "https://images.unsplash.com/photo-1461397932544-11132a69bf46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Fantasy",
    value: "Fantasy",
    width: "100%"
  },
  {
    url: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
    title: "Space",
    value: "Space",
    width: "100%"
  },
  {
    url: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Noir",
    value: "Noir",
    width: "100%"
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

const Genre = ({ navigate, setScenario, setActions, setImgClass }) => {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.innerText);
  };

  useEffect(() => {
    if (genre !== "") {
      setLoading(true);
      if (genre === "Fantasy") {
        setImgClass("fantasy");
      } else if (genre === "Noir") {
        setImgClass("noir");
      } else {
        setImgClass("space");
      }

      apirequest();

    }
  }, [genre]);

  const apirequest = async () => {
    fetch("process.env.REACT_APP_BACKEND_URL/genre", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: genre }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
      setLoading(false);
    });
    navigate("/action");
  };

  return (
    <>
      {loading ? (
        <div>
          <PacmanLoader
            color="yellow"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
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
          {images.map((image) => (
            <ImageButton
              className="genreimages"
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
                  fontFamily={'Handjet, cursive'}
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
export default Genre;
