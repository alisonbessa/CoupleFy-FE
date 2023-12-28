import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { RedirectToLogin } from '../RedirectToLogin';
import AuthenticatedLayout from '../AuthenticatedLayout';

type Props = {
  children: React.ReactNode;
};

type LoaderData = {
  hasCredentials: boolean;
};

export default function ProtectedLayout({ children }: Props) {
  const { hasCredentials } = useLoaderData<LoaderData>();

  if (!hasCredentials) {
    return <RedirectToLogin />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
