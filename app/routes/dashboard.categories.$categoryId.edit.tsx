import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData, Form, useNavigation } from '@remix-run/react';
import { getSession } from '~/utils/session';
import { BACKEND_URL } from '~/config';
import ModalLikeWrapper from '~/components/ModallikeWrapper';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';
import { Category } from '~/types/category';
import { updateCategory } from '~/services/categories';
import { useState, useEffect } from 'react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { categoryId } = params;
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const response = await fetch(`${BACKEND_URL}/categories/${categoryId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Falha ao carregar a categoria');
  }

  const category = await response.json();
  return category;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { categoryId } = params;
  if (!categoryId) {
    return redirect('/dashboard/categories');
  }

  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');
  
  const formData = await request.formData();
  const categoryData: Category = {
    name: formData.get('name') as string,
    // isPrivate: formData.get('isPrivate') === 'on',
    isPrivate: false,
    primaryUserWeight: Number(formData.get('primaryUserWeight')),
    secondaryUserWeight: Number(formData.get('secondaryUserWeight')),
    id: categoryId
  };

  try {
    await updateCategory(categoryData, token);
    return redirect('/dashboard/categories');
  } catch (error) {
    return json({ errorMessage: 'Erro ao salvar a categoria' });
  }
};

export default function EditCategory() {
  const category = useLoaderData<Category>();

  const navigationData = useNavigation();
  const isLoading = navigationData.state !== 'idle'

  const [primaryUserWeight, setPrimaryUserWeight] = useState(50);
  const [secondaryUserWeight, setSecondaryUserWeight] = useState(50);

  useEffect(() => {
    setSecondaryUserWeight(100 - primaryUserWeight);
  }, [primaryUserWeight]);

  useEffect(() => {
    setPrimaryUserWeight(100 - secondaryUserWeight);
  }, [secondaryUserWeight]);

  const handlePrimaryWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryUserWeight(Math.min(100, Math.max(0, Number(event.target.value))));
  };

  const handleSecondaryWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryUserWeight(Math.min(100, Math.max(0, Number(event.target.value))));
  };

  return (
    <ModalLikeWrapper title='Editar Categoria'>
      <Form method="post">
        <TextField
          label="Nome da Categoria"
          name="name"
          defaultValue={category.name}
          required
          fullWidth
          margin="normal"
        />
        {/* <FormControlLabel
          control={<Switch name="isPrivate" defaultChecked={category.isPrivate} />}
          label="Categoria Privada"
        /> */}
        <TextField
          label="Peso para Usuário Primário"
          type="number"
          name="primaryUserWeight"
          value={primaryUserWeight}
          onChange={handlePrimaryWeightChange}
          inputProps={{ min: 0, max: 100, step: 0.01 }}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Peso para Usuário Secundário"
          type="number"
          name="secondaryUserWeight"
          value={secondaryUserWeight}
          onChange={handleSecondaryWeightChange}
          inputProps={{ min: 0, max: 100, step: 0.01 }}
          required
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={isLoading}>Salvar Alterações</Button>
      </Form>
    </ModalLikeWrapper>
  );
}
