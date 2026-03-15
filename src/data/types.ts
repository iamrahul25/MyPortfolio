export interface PortfolioData {
  about: {
    name: string
    aboutMe: string[]
  }
  hero: {
    greeting: string
    tagline: string
    primaryCta: string
    primaryCtaHref: string
    secondaryCta: string
    secondaryCtaHref: string
  }
  socialMedia: {
    linkedin: string
    github: string
    twitter: string
    email: string
  }
  skills: string[]
  projects: {
    title: string
    description: string
    link: string
    image?: string
    tags: string[]
  }[]
  resume: {
    pdfUrl: string
    fileName: string
  }
  contact: {
    message: string
  }
}
