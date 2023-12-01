import { redirect } from '@remix-run/node';
import { destroySession, getSession } from '~/utils/session';

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  // TODO: Add an interation with BE if necessary

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export default function Logout() {
  return null;
}