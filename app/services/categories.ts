import { BACKEND_URL } from "~/config";
import { NewCategory } from "~/types/category";

export async function createCategory(categoryData: NewCategory, token: string) {
    const response = await fetch(`${BACKEND_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(categoryData),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao salvar a categoria');
    }
  
    return response.json();
  }