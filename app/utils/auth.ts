import { BACKEND_URL } from '~/config';
import { commitSession, getSession } from './session';
import { ActionFunction, json, redirect } from '@remix-run/server-runtime';

type UserParameters = {
  email: string,
  password: string
}

type NewUserParameters = UserParameters & {
  name: string,
  costCenterId?: string
}

export async function authenticateUser(email: string, password: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Falha na autenticação');
  }

  return data.accessToken;
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get('Cookie'));
  return !!session.get('token');
}

export async function registerUser(newUserParams: NewUserParameters): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/users`, 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserParams),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Erro ao registrar');
  }
}

export const loginUser = async (userParams: UserParameters, request: Request) => {
  const { email, password } = userParams;

  try {
    const token = await authenticateUser(email, password);
    const session = await getSession(request.headers.get('Cookie'));
    session.set('token', token);

    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    return json({ errorMessage: 'Falha na autenticação. Verifique suas credenciais.' });
  }
};