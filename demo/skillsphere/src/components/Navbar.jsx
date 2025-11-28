// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-left">
        <span className="logo-dot" />
        <span className="logo-text">SkillSphere</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/my-learning">My Learning</NavLink>
      </nav>
      <div className="nav-right">
        <button className="nav-btn nav-btn-outline">Log in</button>
        <button className="nav-btn nav-btn-primary">Sign up</button>
      </div>
    </header>
  );
}