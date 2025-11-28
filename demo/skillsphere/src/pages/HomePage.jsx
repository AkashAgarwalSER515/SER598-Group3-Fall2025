// src/pages/Home.jsx
import { COURSES } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { useLearning } from "../context/LearningContext";


export default function HomePage() {
  const featuredCourses = COURSES.filter((c) => c.featured);
  const { enroll } = useLearning();

  return (
    <main className="page">
      <header className="hero">
        <h1>Grow your skills. One course at a time.</h1>
        <p>
          Hands-on content to help you master modern web development and
          performant, scalable deployment.
        </p>
      </header>

      <section className="section">
        <h2>Featured Courses</h2>
        <div className="course-grid">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onEnroll={enroll} />
          ))}
        </div>
      </section>
    </main>
  );
}
