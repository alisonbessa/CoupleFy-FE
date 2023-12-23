import { Button, TextField, FormControlLabel, Switch, Slider, Tooltip } from '@mui/material';
import { ActionFunction, json, redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import ModalLikeWrapper from '~/components/ModallikeWrapper';
import { createCategory } from '~/services/categories';
import { getSession } from '~/utils/session';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token');

  const formData = await request.formData();
  const name = formData.get('name');
  const isPrivate = false;
  // const isPrivate = formData.get('isPrivate') === 'on';
  const primaryUserWeightValue = formData.get('primaryUserWeight');
  const secondaryUserWeightValue = formData.get('secondaryUserWeight');

  const primaryUserWeight = primaryUserWeightValue ? Number(primaryUserWeightValue) : 0;
  const secondaryUserWeight = secondaryUserWeightValue ? Number(secondaryUserWeightValue) : 0;

  try {
    if (typeof name === 'string') {
      await createCategory({ name, isPrivate, primaryUserWeight, secondaryUserWeight }, token);
      return redirect('/dashboard/categories');
    } else {
      throw new Error('Nome da categoria inválido');
    }
  } catch (error) {
    return json({ errorMessage: 'Erro ao salvar a categoria' });
  }
};

export default function NewCategory() {
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
    <ModalLikeWrapper title='Nova Categoria'>
      <Form method="post">
        <TextField
          label="Nome da Categoria"
          name="name"
          required
          fullWidth
          margin="normal"
        />

        {/* TODO: Add the private option  */}
        {/* <Tooltip title="Marque esta opção se a categoria for privada e visível apenas para você">
          <FormControlLabel
            control={<Switch name="isPrivate" />}
            label="Categoria Privada"
          />
        </Tooltip> */}

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

        <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={isLoading}>Salvar Categoria</Button>
      </Form>
    </ModalLikeWrapper>
  );
}
