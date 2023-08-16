import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const Genre = () => {
  const [genre, setGenre] = useState("");
  // const [scenario, setScenario] = useState("");

  const giveGenreValue = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    console.log("logging value", value);
    await setGenre(value);
    console.log("logging genre", genre);
    apirequest();
  };

  const apirequest = async () => {
    console.log(genre);
    fetch("/genre", {
      method: "post",
      body: JSON.stringify({ genre: genre }),
    }).then(async (response) => {
      let data = await response.json();
      console.log(data);
      // setScenario(data.setting);
      // console.log(data.setting);

      // console.log(data.actions[0]);
      // console.log(data.actions[1]);
    });
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
      <Button variant="text" color="primary">
        Noir
      </Button>
      <Button variant="text" color="primary">
        Space
      </Button>
    </>
  );
};

export default Genre;
