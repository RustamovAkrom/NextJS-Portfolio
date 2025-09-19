export interface IconLinkType {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

export interface StatType {
  id: number;
  name: string;
  value: number | string;
}

export interface HomeContentType {
  title: string;
  description: string;
  resume: string;
  image: string;
  links: IconLinkType[];
  stats: StatType[];
}