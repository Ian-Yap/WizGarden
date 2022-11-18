import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Dashboard-admin";
import ParentDashboard from "./components/Dashboard-parent";
import Home from "./components/Home";
import Lessons from "./components/Lessons";
import Loginpage from "./components/Loginpage";
import Logout from "./components/Logout";
import Staff from "./components/Staff";
import SignUpForm from "./components/SignUpForm";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material";
import blue from "@mui/material/colors/blue";
import "./styles.css";
import EnglishLessons from "./components/EnglishLessons";
import ChineseLessons from "./components/ChineseLessons";
import MathLessons from "./components/MathLessons";
import ScienceLessons from "./components/ScienceLessons";
import EditParent from "./components/EditParent";
import { UserContext } from "./context/UserContext";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [parent, setParent] = useState([]);
  const [userlevel, setUserlevel] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      <UserContext.Provider
        value={{
          username,
          setUsername,
          isLogged,
          setIsLogged,
          userlevel,
          setUserlevel,
          firstname,
          setFirstname,
          parent,
          setParent,
        }}
      >
        <Navbar />
        <ThemeProvider theme={theme}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/loginpage" element={<Loginpage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/englishlessons" element={<EnglishLessons />} />
              <Route path="/chineselessons" element={<ChineseLessons />} />
              <Route path="/mathlessons" element={<MathLessons />} />
              <Route path="/sciencelessons" element={<ScienceLessons />} />
              <Route path="/edit-parent" element={<EditParent />} />
            </Routes>
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
