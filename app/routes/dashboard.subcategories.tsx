import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { Button, List } from '@mui/material';
import { LoaderFunction } from '@remix-run/node';
import { getSession } from '~/utils/session';
import { BACKEND_URL } from '~/config';
import SubcategoryItem from '~/components/SubcategoryItem';
import { Subcategory } from '~/types/subcategory';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const response = await fetch(`${BACKEND_URL}/subcategories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const subcategories = await response.json();

  return subcategories;
};

export default function DashboardSubcategories() {
  const subcategories = useLoaderData<Subcategory[]>();

  return (
    <div>
      <h1>Subcategorias</h1>
      <Link to="/dashboard/subcategories/new" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">Nova Subcategoria</Button>
      </Link>

      <List>
        {subcategories.map((subcategory) => (
          <SubcategoryItem 
            key={subcategory.id} 
            subcategory={subcategory}
          />
        ))}
      </List>

      <Outlet />
    </div>
  );
}
