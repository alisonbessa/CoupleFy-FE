import { ActionFunction, redirect } from '@remix-run/node';
import { BACKEND_URL } from '~/config';
import { getSession } from '~/utils/session';

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const { subcategoryId } = params;

  try {
    const response = await fetch(`${BACKEND_URL}/subcategories/${subcategoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir a subcategoria');
    }

    return redirect('/dashboard/subcategories');
  } catch (error) {
    return { errorMessage: 'Falha ao excluir a subcategoria' };
  }
};
