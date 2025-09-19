export interface LinkType {
  href: string;
  name: string;
}

export interface StatType {
  id: number;
  name: string;
  value: number | string;
}

export interface TimelineItemType {
  id: number;
  type: string;
  role: string;
  company: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

export interface AboutContentType {
  image: string;
  alt: string;
  links: LinkType[];
  stats: StatType[];
  timeline: TimelineItemType[];
  filters: string[];
}
