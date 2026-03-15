import { data } from '../data'

export function About() {
  const { about } = data
  return (
    <section id="about" className="about">
      <h2 className="section-title">About</h2>
      <div className="about__content">
        {about.aboutMe.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <style>{`
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text);
        }
        .about__content {
          max-width: 50ch;
        }
        .about__content p {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .about__content p:last-child { margin-bottom: 0; }
      `}</style>
    </section>
  )
}
