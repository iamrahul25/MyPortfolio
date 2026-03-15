import { data } from '../data'

export function Contact() {
  const { contact, socialMedia } = data
  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Contact</h2>
      <p className="contact__text">{contact.message}</p>
      <div className="contact__links">
        {socialMedia.email && (
          <a href={`mailto:${socialMedia.email}`} className="contact__link">
            {socialMedia.email}
          </a>
        )}
        <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="contact__link">
          GitHub
        </a>
        <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
          LinkedIn
        </a>
      </div>
      <style>{`
        .contact__text {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          max-width: 40ch;
        }
        .contact__links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .contact__link {
          font-weight: 500;
        }
      `}</style>
    </section>
  )
}
