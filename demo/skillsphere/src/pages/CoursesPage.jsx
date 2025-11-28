// src/pages/Courses.jsx
import { useState } from "react";
import { COURSES } from "../data/courses";
import CourseCard from "../components/CourseCard";
import {useLearning } from "../context/LearningContext.jsx";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const { enroll } = useLearning();

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === "All" || course.level === level;
    return matchesSearch && matchesLevel;
  });

  return (
    <main className="page">
      <header className="page-header">
        <h1>All Courses</h1>
        <p>Browse all SkillSphere content.</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search courses…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="All">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <section className="section">
        {filteredCourses.length === 0 ? (
          <p>No courses match your filters yet.</p>
        ) : (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={enroll} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
