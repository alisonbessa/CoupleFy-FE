import { BACKEND_URL } from '~/config';
import { Category, NewCategory } from '~/types/category';

export async function fetchCategories(token: string) {
  const response = await fetch(`${BACKEND_URL}/categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  const categories = await response.json();
  return categories;
}

export async function createCategory(categoryData: NewCategory, token: string) {
  const response = await fetch(`${BACKEND_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error('Erro ao salvar a categoria');
  }

  return response.json();
}

export async function updateCategory(categoryData: Category, token: string) {
  const response = await fetch(`${BACKEND_URL}/categories/${categoryData.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar a categoria');
  }

  return await response.json();
}
