import Homepage from '../homepage/Homepage'
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
    </Routes>
  );
}

export default App;
