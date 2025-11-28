// src/components/CourseCard.jsx
export default function CourseCard({ course, onEnroll }) {
  return (
    <article className="course-card">
      <h3>{course.title}</h3>
      <p className="course-meta">
        <span>{course.category}</span> • <span>{course.level}</span> •{" "}
        <span>{course.duration}</span>
      </p>
      <p className="course-description">{course.description}</p>
      <div className="course-tags">
        {course.tags.map((tag) => (
          <span key={tag} className="course-tag">
            {tag}
          </span>
        ))}
      </div>
      {onEnroll && (
        <button className="primary-button" onClick={() => onEnroll(course)}>
          Enroll
        </button>
      )}
    </article>
  );
}