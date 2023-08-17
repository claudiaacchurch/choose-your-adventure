import Button from "@mui/material/Button";
import React, { useState, useNavigate, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Genre = ({ navigate, setScenario, setActions  }) => {
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");

  const giveGenreValue = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  useEffect(() => {
    if (genre !== "") {
      setLoading(true);
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
      setLoading(false);
    });
    navigate('/action')

  };

  return (
    <>
    {loading ? 
      <div>
        <ClipLoader
        color="black"
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader" />  
      </div> :
      <div>
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
      </div>
    } 
    </>
  );
};

export default Genre;
