import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSeller from "./components/DashboardSeller";
import NewHotel from "./components/NewHotel";

function App() {
  const { username } = useSelector((state) => state.user.value);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={username ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/hotels/new" element={<NewHotel />} />
          <Route path="/dashboard/seller" element={<DashboardSeller />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
