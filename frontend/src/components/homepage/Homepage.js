import Genre from "../genre/Genre";

const Homepage = ({ setScenario, setActions, navigate }) => {
  return (
    <>
      <h3 className="title"> Infinity Trails</h3>
      <div className="intro">
        <p>Welcome to your next adventure</p>
      </div>
      <div className="genre">
        <Genre setScenario={setScenario} setActions={setActions} navigate={navigate}/>
      </div>
    </>
  );
};

export default Homepage;
