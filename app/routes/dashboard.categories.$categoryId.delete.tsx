import { ActionFunction, redirect } from '@remix-run/node';
import { BACKEND_URL } from '~/config';
import { getSession } from '~/utils/session';

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const { categoryId } = params;

  try {
    const response = await fetch(`${BACKEND_URL}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir a categoria');
    }

    return redirect('/dashboard/categories');
  } catch (error) {
    return { errorMessage: 'Falha ao excluir categoria' };
  }
};
