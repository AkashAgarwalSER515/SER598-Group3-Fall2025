import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import MyLearningPage from "./pages/MyLearningPage";
import "./components/Navbar.css";
import "./components/CourseCard.css";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/my-learning" element={<MyLearningPage />} />
      </Routes>

      <footer className="footer">
        © 2025 SkillSphere — Learning platform demo for SER598.
      </footer>
    </div>
  );
}

export default App;
