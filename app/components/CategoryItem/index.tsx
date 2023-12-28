import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetcher, useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/server-runtime';

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
  secondaryUserWeight,
}: CategoryItemProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/categories/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await fetcher.submit(
        { id },
        { method: 'delete', action: `/dashboard/categories/${id}/delete` }
      );
    }
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">
          Peso Usuário Primário: {primaryUserWeight}%
        </Typography>
        <Typography variant="body2">
          Peso Usuário Secundário: {secondaryUserWeight}%
        </Typography>
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
