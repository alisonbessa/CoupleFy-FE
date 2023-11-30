import React from 'react';
import { Container, TextField, Button, Card, Typography, Alert } from '@mui/material';
import { json, redirect, ActionFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { BACKEND_URL } from '~/config';
import { commitSession, getSession } from '~/session';

async function authenticateUser(email: string, password: string): Promise<string> {
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
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

export default function Index() {
  const actionData = useActionData<{ errorMessage: string }>();

  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {actionData?.errorMessage && <Alert severity="error">{actionData.errorMessage}</Alert>}
        <form method="post">
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
        </form>
      </Card>
    </Container>
  );
}
