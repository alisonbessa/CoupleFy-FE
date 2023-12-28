/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from '@remix-run/node';
import {
  useActionData,
  Form,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ModalLikeWrapper from '~/components/ModallikeWrapper';
import { Category } from '~/types/category';
import { createSubcategory } from '~/services/subcategories';
import { fetchCategories } from '~/services/categories';
import { getSession } from '~/utils/session';
import { useState, useEffect } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');
  const categories = await fetchCategories(token);

  return categories;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const formData = await request.formData();
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const primaryUserWeightValue = formData.get('primaryUserWeight');
  const secondaryUserWeightValue = formData.get('secondaryUserWeight');

  const primaryUserWeight = primaryUserWeightValue
    ? Number(primaryUserWeightValue)
    : 0;
  const secondaryUserWeight = secondaryUserWeightValue
    ? Number(secondaryUserWeightValue)
    : 0;

  try {
    await createSubcategory(
      { name, categoryId, primaryUserWeight, secondaryUserWeight },
      token
    );
    return redirect('/dashboard/subcategories');
  } catch (error) {
    return json({ errorMessage: 'Erro ao criar a subcategoria' });
  }
};

export default function NewSubcategory() {
  const categories = useLoaderData<Category[]>();
  const navigationData = useNavigation();
  const isLoading = navigationData.state !== 'idle';

  const [primaryUserWeight, setPrimaryUserWeight] = useState(50);
  const [secondaryUserWeight, setSecondaryUserWeight] = useState(50);

  useEffect(() => {
    setSecondaryUserWeight(100 - primaryUserWeight);
  }, [primaryUserWeight]);

  useEffect(() => {
    setPrimaryUserWeight(100 - secondaryUserWeight);
  }, [secondaryUserWeight]);

  const handlePrimaryWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrimaryUserWeight(
      Math.min(100, Math.max(0, Number(event.target.value)))
    );
  };

  const handleSecondaryWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondaryUserWeight(
      Math.min(100, Math.max(0, Number(event.target.value)))
    );
  };

  return (
    <ModalLikeWrapper title="Nova Subcategoria">
      <Form method="post">
        <TextField
          label="Nome da Subcategoria"
          name="name"
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            label="Categoria"
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Salvar Subcategoria
        </Button>
      </Form>
    </ModalLikeWrapper>
  );
}
