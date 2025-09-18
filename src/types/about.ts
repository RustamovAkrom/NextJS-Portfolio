export interface Link {
  href: string;
  name: string;
}

export interface Stat {
  id: number;
  name: string;
  value: number | string;
}

export interface TimelineItem {
  id: number;
  type: string;
  role: string;
  company: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

export interface AboutContent {
  image: string;
  alt: string;
  links: Link[];
  stats: Stat[];
  timeline: TimelineItem[];
  filters: string[];
}
