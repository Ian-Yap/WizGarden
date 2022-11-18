import React, { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { firstname, isLogged } = useContext(UserContext);

  return (
    <nav className="nav">
      <Link className="site-title">Wizgarden</Link>
      <ul>
        <CustomLink to="/englishlessons">English Lessons</CustomLink>
        <CustomLink to="/mathlessons">Math Lessons</CustomLink>
        <CustomLink to="/chineselessons">Chinese Lessons</CustomLink>
        <CustomLink to="/sciencelessons">Science Lessons</CustomLink>
        {isLogged && <CustomLink to="">welcome {firstname}! </CustomLink>}
        {isLogged && <CustomLink to="/logout">Log Out</CustomLink>}

        {/* <CustomLink to="/Staff">Staff</CustomLink> */}
        {/* <CustomLink to="/Dashboard">Dashboard</CustomLink> */}
        {!isLogged && <CustomLink to="/loginpage">Login</CustomLink>}
        {!isLogged && <CustomLink to="/Signup">Sign up</CustomLink>}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
