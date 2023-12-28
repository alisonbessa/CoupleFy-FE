import { Link, Outlet, useLoaderData } from '@remix-run/react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { LoaderFunction } from '@remix-run/node';
import { getSession } from '~/utils/session';
import { BACKEND_URL } from '~/config';
import SubcategoryItem from '~/components/SubcategoryItem';
import { Subcategory } from '~/types/subcategory';
import { useState } from 'react';
import { Category } from '~/types/category';

export interface DashboardSubcategoriesLoaderData {
  subcategories: Subcategory[];
  categories: Category[];
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<DashboardSubcategoriesLoaderData> => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const subcategoriesResponse = await fetch(`${BACKEND_URL}/subcategories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const subcategories = await subcategoriesResponse.json();

  const categoriesResponse = await fetch(`${BACKEND_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const categories = await categoriesResponse.json();

  return { subcategories, categories };
};

export default function DashboardSubcategories() {
  const { subcategories, categories }: DashboardSubcategoriesLoaderData =
    useLoaderData();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategoryId(event.target.value);
  };

  const filteredSubcategories = selectedCategoryId
    ? subcategories.filter(
        (subcategory) => subcategory.categoryId === selectedCategoryId
      )
    : subcategories;

  return (
    <div>
      <h1>Subcategorias</h1>
      <Box display="flex" gap={2}>
        <Link
          to="/dashboard/subcategories/new"
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained" color="primary">
            Nova Subcategoria
          </Button>
        </Link>

        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            label="Categoria"
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <List>
        {filteredSubcategories.length > 0 ? (
          filteredSubcategories.map((subcategory) => (
            <SubcategoryItem key={subcategory.id} subcategory={subcategory} />
          ))
        ) : (
          <p>Você ainda não tem opções dentro dessa categoria.</p>
        )}
      </List>

      <Outlet />
    </div>
  );
}
