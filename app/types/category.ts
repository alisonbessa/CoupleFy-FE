export interface Category {
  id: string;
  name: string;
  isPrivate: boolean;
  primaryUserWeight: number;
  secondaryUserWeight: number;
}

export type NewCategory = Omit<Category, 'id'>;
