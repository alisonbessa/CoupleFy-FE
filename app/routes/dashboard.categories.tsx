import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { LoaderFunction } from '@remix-run/node';
import { getSession } from '~/utils/session';
import { BACKEND_URL } from '~/config';
import CategoryItem from '~/components/CategoryItem';
import { Category } from '~/types/category';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const response = await fetch(`${BACKEND_URL}/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const categories = await response.json();

  return categories;
};

export default function DashboardCategories() {
  const categories = useLoaderData<Category[]>();

  return (
    <div>
      <h1>Categorias</h1>
      <Link to="/dashboard/categories/new" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Nova Categoria
        </Button>
      </Link>

      <List>
        {categories.map((category) => (
          <CategoryItem 
            key={category.id} 
            id={category.id} 
            name={category.name} 
            primaryUserWeight={category.primaryUserWeight}
            secondaryUserWeight={category.secondaryUserWeight}
          />
        ))}
      </List>

      <Outlet />
    </div>
  );
}
