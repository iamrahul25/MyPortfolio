import { data } from '../data'

export function Resume() {
  const { resume } = data
  const pdfUrl = resume.pdfUrl
  const fileName = resume.fileName

  return (
    <section id="resume" className="resume">
      <h2 className="section-title">Resume</h2>
      <p className="resume__text">View or download my resume.</p>
      <div className="resume__actions">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="resume__btn resume__btn--primary"
        >
          View Resume
        </a>
        <a
          href={pdfUrl}
          download={fileName}
          className="resume__btn resume__btn--outline"
        >
          Download
        </a>
      </div>
      <style>{`
        .resume__text {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          max-width: 40ch;
        }
        .resume__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .resume__btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .resume__btn:hover {
          transform: translateY(-2px);
        }
        .resume__btn--primary {
          background: var(--accent);
          color: var(--bg);
        }
        .resume__btn--primary:hover {
          box-shadow: 0 8px 24px var(--accent-dim);
        }
        .resume__btn--outline {
          border: 2px solid var(--border);
          color: var(--text);
        }
        .resume__btn--outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </section>
  )
}
