export interface Testimonial {
  quote: string;
  author: string;
  /** e.g. "Founder" or "CTO" */
  role: string;
  /** Omit if the client asked not to be named. */
  company?: string;
  /** Link to the source (Upwork review, LinkedIn recommendation…). */
  sourceUrl?: string;
}

/** Real client testimonials only. While this is empty the section does not render at all. */
export const TESTIMONIALS: Testimonial[] = [];
