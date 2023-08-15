import Button from "@mui/material/Button";
import { useState } from "react";

const Genre = () => {
  const [genre, setGenre] = useState("");
  const [scenario, setScenario] = useState("");

  const giveGenreValue = (e) => {
    const value = e.target.value;
    setGenre(value);
    apirequest();
  };

  const apirequest = async () => {
    fetch("/", {
      method: "post",
      body: genre,
    }).then(async (response) => {
      let data = await response.json();
      setScenario(data.setting);
      console.log(data.setting);

      console.log(data.actions[0]);
      console.log(data.actions[1]);
      console.log(data.a);
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
