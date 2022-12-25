import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import HotelList from "./components/HotelList";
import Hotel from "./components/Hotel";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
