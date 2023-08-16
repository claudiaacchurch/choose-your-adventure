import Genre from "../genre/Genre";

const Homepage = ({ setScenario, setActions }) => {
  return (
    <>
      <h3 className="title"> Infinity Trails</h3>
      <div className="intro">
        <p>Welcome to your next adventure</p>
      </div>
      <div className="genre">
        <Genre setScenario={setScenario} setActions={setActions} />
      </div>
    </>
  );
};

export default Homepage;
