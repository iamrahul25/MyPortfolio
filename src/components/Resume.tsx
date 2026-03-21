import { data } from '../data'

export function Resume() {
  const { resume } = data
  const pdfUrl = resume.pdfUrl
  const fileName = resume.fileName

  return (
    <section id="resume" className="resume">
      <div className="section-header">
        <div className="section-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Resume
        </div>
        <h2 className="section-title">Resume <span>PDF</span></h2>
      </div>

      <div className="resume__card">
        <div className="resume__card-top">
          <div className="resume__card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="resume__card-body">
            <h3 className="resume__card-title">Resume — 2026</h3>
            <p className="resume__card-sub">Full-stack Developer · React · Node.js · MongoDB</p>
          </div>
        </div>
        <div className="resume__actions">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="resume__btn resume__btn--primary"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Resume
          </a>
          <a
            href={pdfUrl}
            download={fileName}
            className="resume__btn resume__btn--outline"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
        </div>
      </div>

      <style>{`
        .resume__card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-lg);
          padding: 2rem;
          max-width: 640px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .resume__card-top {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .resume__card-top { flex-direction: row; align-items: center; gap: 2rem; }
        }
        .resume__card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .resume__card:hover {
          border-color: rgba(124,58,237,0.3);
          box-shadow: 0 8px 40px rgba(124,58,237,0.12);
        }

        .resume__card-icon {
          width: 64px; height: 64px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1));
          border: 1px solid rgba(124,58,237,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        .resume__card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .resume__card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
        }
        .resume__card-sub {
          font-size: 0.75rem;
          color: var(--accent2);
          font-family: var(--font-mono);
          margin-bottom: 0.5rem;
        }

        .resume__actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .resume__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.2rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .resume__btn:hover { transform: translateY(-2px); }

        .resume__btn--primary {
          background: linear-gradient(135deg, var(--accent), #5b21b6);
          color: #fff;
          box-shadow: 0 4px 16px var(--accent-glow);
        }
        .resume__btn--primary:hover {
          box-shadow: 0 8px 28px var(--accent-glow);
          opacity: 0.9;
          color: #fff;
        }
        .resume__btn--outline {
          border: 1.5px solid var(--border);
          color: var(--text);
          background: rgba(255,255,255,0.03);
        }
        .resume__btn--outline:hover {
          border-color: var(--accent2);
          color: var(--accent2);
          background: rgba(6,182,212,0.06);
        }
      `}</style>
    </section>
  )
}
