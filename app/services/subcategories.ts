import { BACKEND_URL } from "~/config";
import { NewSubcategory, Subcategory } from "~/types/subcategory";

export async function createSubcategory(subcategoryData: NewSubcategory, token: string) {
	const response = await fetch(`${BACKEND_URL}/subcategories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(subcategoryData),
	});

	if (!response.ok) {
		throw new Error('Erro ao criar  subcategoria');
	}

	return response.json();
}

export async function fetchSubcategory(subcategoryId: string, token: string) {
  const response = await fetch(`${BACKEND_URL}/subcategories/${subcategoryId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Falha ao carregar a subcategoria');
  }

  return response.json();
}

export async function updateSubcategory(subcategoryData: Subcategory, token: string) {
  const response = await fetch(`${BACKEND_URL}/subcategories/${subcategoryData.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subcategoryData)
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar a subcategoria');
  }

  return response.json();
}