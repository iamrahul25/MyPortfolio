import { data } from '../data'

export function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills</h2>
      <ul className="skills__list">
        {data.skills.map((skill) => (
          <li key={skill} className="skills__item">
            {skill}
          </li>
        ))}
      </ul>
      <style>{`
        .skills__list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .skills__item {
          padding: 0.5rem 1rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--text);
        }
        .skills__item:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </section>
  )
}
