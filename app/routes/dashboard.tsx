import { redirect } from '@remix-run/node';
import React from 'react';
import { getSession } from '~/session';

export const loader = async ({ request }:any) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  if (!token) {
    return redirect('/');
  }

  return null;
};

export default function Dashboard() {
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao seu painel de controle!</p>
    </React.Fragment>
  );
}