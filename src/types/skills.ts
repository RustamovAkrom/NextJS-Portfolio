export interface SkillType {
  icon: string;
  title: string;
  items: string[];
}

export interface ProgressSkillType {
  name: string;
  level: number;
}

export interface SkillsDataType {
  skills: SkillType[];
  progressSkills: ProgressSkillType[];
}
