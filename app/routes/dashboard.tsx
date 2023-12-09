import ProtectedLayout from '~/components/ProtectedLayout';
import { isAuthenticated } from '~/utils/auth';

export const loader = async ({ request }:any) => {
  const hasCredentials = await isAuthenticated(request)
  
  return {
    hasCredentials,
    request
  };
};

export default function Dashboard() {
  return (
    <ProtectedLayout>
      <h1>Dashboard</h1>
      <p>Esse é seu painel de controle!</p>
    </ProtectedLayout>
  );
}