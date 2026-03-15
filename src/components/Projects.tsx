import { data } from '../data'

export function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects__grid">
        {data.projects.map((project) => (
          <article key={project.title} className="project-card">
            {project.image && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__img-wrap">
                <img src={project.image} alt="" className="project-card__img" />
              </a>
            )}
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-card__tag">
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
              View project →
            </a>
          </article>
        ))}
      </div>
      <style>{`
        .projects__grid {
          display: grid;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .projects__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .projects__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .project-card {
          padding: 1.5rem;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s;
        }
        .project-card:hover {
          border-color: var(--accent);
        }
        .project-card__img-wrap {
          display: block;
          margin: -1.5rem -1.5rem 1rem -1.5rem;
          border-radius: 12px 12px 0 0;
          overflow: hidden;
        }
        .project-card__img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          vertical-align: middle;
        }
        .project-card__title {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .project-card__desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .project-card__tag {
          font-size: 0.75rem;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .project-card__link {
          font-size: 0.9rem;
          font-weight: 600;
        }
      `}</style>
    </section>
  )
}
