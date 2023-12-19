import { Outlet } from '@remix-run/react';
import ProtectedLayout from '~/components/ProtectedLayout';
import { LoaderData } from '~/types/authLoader';
import { isAuthenticated } from '~/services/auth';

export const loader = async ({ request }:any): Promise<LoaderData> => {
  const token = await isAuthenticated(request)
  
  return {
    token,
    hasCredentials: !!token,
    request
  };
};

export default function Dashboard() {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}