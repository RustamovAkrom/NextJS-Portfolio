import * as  Icons from "lucide-react";

export interface ServiceType {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  features: string[];
}
