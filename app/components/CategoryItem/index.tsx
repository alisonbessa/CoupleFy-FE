import React from 'react';
import { ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type CategoryItemProps = {
  id: string;
  name: string;
  primaryUserWeight: number;
  secondaryUserWeight: number;
};

export default function CategoryItem({
	id,
	name,
	primaryUserWeight,
	secondaryUserWeight
}: CategoryItemProps) {
  const handleEdit = () => {
    // Implemente a lógica de navegação para a página de edição aqui
  };

  const handleDelete = () => {
    // Implemente a lógica de exclusão aqui
  };

  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Peso Usuário Primário: {primaryUserWeight}%</Typography>
        <Typography variant="body2">Peso Usuário Secundário: {secondaryUserWeight}%</Typography>
      </Box>
      <Box>
        <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}