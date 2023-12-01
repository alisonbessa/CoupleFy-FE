import { Link } from '@remix-run/react';
import { Button, Container, Typography, Card } from '@mui/material';

export function RedirectToLogin() {
  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 3, marginTop: 5, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Acesso Restrito
        </Typography>
        <Typography variant="body1">
          Por favor, faça login para acessar esta página.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Ir para Login
        </Button>
      </Card>
    </Container>
  )
}