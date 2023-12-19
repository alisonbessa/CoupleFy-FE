import { Container, TextField, Button, Card, Typography, Alert, Box, Link } from '@mui/material';
import { redirect, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { getSession } from '~/utils/session';
import { loginUser } from '~/services/auth';

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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  return await loginUser({ email, password }, request);
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
          <Box display="flex" justifyContent="center" mt="16px">
            Não tem uma conta?&nbsp;
            <Link href="/register">
              Registre-se
            </Link>
          </Box>
        </form>
      </Card>
    </Container>
  );
}