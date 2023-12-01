import { getSession } from './session';

export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get('Cookie'));
  return !!session.get('token');
}
