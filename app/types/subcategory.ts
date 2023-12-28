export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  primaryUserWeight: number;
  secondaryUserWeight: number;
}

export type NewSubcategory = Omit<Subcategory, 'id'>;
