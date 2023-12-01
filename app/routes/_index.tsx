import { redirect, LoaderFunction } from '@remix-run/node';
import { getSession } from '~/utils/session';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  
  const token = session.get('token');
  if (token) {
    return redirect('/dashboard');
  }

  return redirect('/index');
};

export default function Index() {}
