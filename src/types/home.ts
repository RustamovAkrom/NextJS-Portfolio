export interface IconLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

export interface Stat {
  id: number;
  name: string;
  value: number | string;
}

export interface HomeContent {
  title: string;
  description: string;
  resume: string;
  image: string;
  links: IconLink[];
  stats: Stat[];
}