export interface ProjectType {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  slug: string;
  date: string;
  technologies: string[];
  github: string;
  deploy: string;
  screenshots: { src: string; alt: string }[];
}