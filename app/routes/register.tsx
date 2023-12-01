import { json, redirect, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { Container, TextField, Button, Card, Typography, Alert, Box, Link } from '@mui/material';
import { loginUser, registerUser } from '~/utils/auth';
import { getSession } from '~/session';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  
  const token = session.get('token');
  if (token) {
    return redirect('/dashboard');
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const costCenterId = formData.get('costCenterId') as string || undefined;

  try {
    await registerUser({ name, email, password, costCenterId: undefined });
    return await loginUser({ email, password }, request)
  } catch (error) {
    return json({ errorMessage: (error as Error).message });
  }
};

export default function Register() {
  const actionData = useActionData<{ errorMessage: string }>();
  
  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Cadastre-se
        </Typography>
        {actionData?.errorMessage && <Alert severity="error">{actionData.errorMessage}</Alert>}
        <Form method="post">
          <TextField 
            name="name"
            label="Nome"
            type="text"
            fullWidth
            required
            margin="normal"
          />
          <TextField 
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
          />
          <TextField 
            name="password"
            label="Senha"
            type="password"
            fullWidth
            required
            margin="normal"
          />
          <TextField 
            name="costCenterId"
            label="Código do convite (opcional)"
            type="text"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </Form>
        <Box display="flex" justifyContent="center" mt="16px">
            Já tem uma conta?&nbsp;
            <Link href="/index">
              Faça o login
            </Link>
          </Box>
      </Card>
    </Container>
  );
}
