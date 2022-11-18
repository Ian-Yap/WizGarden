import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import "./Loginpage.css";

const Loginpage = () => {
  const [loginname, setLoginname] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername, setIsLogged, setUserlevel, setFirstname } =
    useContext(UserContext);
  const history = useNavigate();
  //setIsLogged(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginname);

    const result = await axios.post("http://localhost:5001/api/userlogin", {
      username: loginname.toLowerCase(),
      password: password,
    });
    console.log(result.data);

    if (result.data.status === "ok") {
      setUsername(result.data.userdata.user);
      setIsLogged(true);
      setUserlevel(result.data.userdata.level);
      setFirstname(result.data.userdata.firstname);
      localStorage.setItem("user-info", JSON.stringify(result.data.userdata));

      // console.log('result.data.userdata.level', result.data.userdata.level);
      if (result.data.userdata.level === 1) {
        history("/admin-dashboard");
      } else if (result.data.userdata.level === 2) {
        history("/parent-dashboard");
      } else {
        history("/dashboard");
      }
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="inputBox"
            value={loginname}
            onChange={(e) => setLoginname(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <button className="submitButton" type="submit">
          Log In
        </button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/Signup" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Loginpage;
