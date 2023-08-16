import Button from "@mui/material/Button";
import React, { useState, useNavigate, useEffect } from "react";

const Genre = ({ navigate, setScenario, setActions  }) => {
  const [genre, setGenre] = useState("");

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  useEffect(() => {
    if (genre !== "") {
      apirequest();
    }
  }, [genre]);

  const apirequest = async () => {
    fetch("http://localhost:8080/genre", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre: genre }),
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.response.setting);
      setActions(data.response.actions);
    });
    navigate('/action')
  };

  return (
    <>
      <Button
        className="fantasy-btn"
        variant="text"
        color="primary"
        onClick={giveGenreValue}
        value="fantasy"
      >
        Fantasy
      </Button>
      <Button
        className="noir-btn"
        variant="text"
        color="primary"
        onClick={giveGenreValue}
        value="noir"
      >
        Noir
      </Button>
      <Button
        className="space-btn"
        variant="text"
        color="primary"
        onClick={giveGenreValue}
        value="space"
      >
        Space
      </Button>
    </>
  );
};

export default Genre;
