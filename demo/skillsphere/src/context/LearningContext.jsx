// src/context/LearningContext.jsx
import { createContext, useContext, useState } from "react";

const LearningContext = createContext();

export function LearningProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  function enroll(course) {
    // avoid duplicates
    setEnrolledCourses((prev) =>
      prev.find((c) => c.id === course.id) ? prev : [...prev, course]
    );
  }

  function unenroll(courseId) {
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId));
  }

  const value = { enrolledCourses, enroll, unenroll };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}
