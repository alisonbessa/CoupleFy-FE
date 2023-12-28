import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, Form, useNavigation } from '@remix-run/react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ModalLikeWrapper from '~/components/ModallikeWrapper';
import { Category } from '~/types/category';
import { Subcategory } from '~/types/subcategory';
import { fetchCategories } from '~/services/categories';
import { fetchSubcategory, updateSubcategory } from '~/services/subcategories';
import { getSession } from '~/utils/session';
import { useState, useEffect } from 'react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { subcategoryId } = params;

  if (!subcategoryId) {
    return redirect('/dashboard/subcategories');
  }

  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  // Carregar subcategoria atual e categorias disponíveis
  const [currentSubcategory, categories] = await Promise.all([
    fetchSubcategory(subcategoryId, token),
    fetchCategories(token),
  ]);

  return { currentSubcategory, categories };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { subcategoryId } = params;

  if (!subcategoryId) {
    return redirect('/dashboard/subcategories');
  }

  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const formData = await request.formData();
  const subcategoryData: Subcategory = {
    id: subcategoryId,
    name: formData.get('name') as string,
    categoryId: formData.get('categoryId') as string,
    primaryUserWeight: Number(formData.get('primaryUserWeight')),
    secondaryUserWeight: Number(formData.get('secondaryUserWeight')),
  };

  try {
    await updateSubcategory(subcategoryData, token);
    return redirect('/dashboard/subcategories');
  } catch (error) {
    return json({ errorMessage: 'Erro ao criar a subcategoria' });
  }
};

export default function EditSubcategory() {
  const { currentSubcategory: subcategory, categories } = useLoaderData<{
    currentSubcategory: Subcategory;
    categories: Category[];
  }>();
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
    <ModalLikeWrapper title="Editar Subcategoria">
      <Form method="post">
        <TextField
          label="Nome da Subcategoria"
          name="name"
          defaultValue={subcategory.name}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            defaultValue={subcategory.categoryId}
            label="Categoria"
            required
          >
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
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
