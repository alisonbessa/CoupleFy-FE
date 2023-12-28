import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Subcategory } from '~/types/subcategory';

type SubcategoryItemProps = {
  subcategory: Subcategory;
};

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({ subcategory }) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleEdit = () => {
    navigate(`/dashboard/subcategories/${subcategory.id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await fetcher.submit(
        { id: subcategory.id },
        {
          method: 'delete',
          action: `/dashboard/subcategories/${subcategory.id}/delete`,
        }
      );
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: 'bold' }}
          >
            {subcategory.name}
          </Typography>
        }
        secondary={
          <>
            <Typography variant="body2" color="textSecondary" component="span">
              Peso Usuário Primário: {subcategory.primaryUserWeight}%
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="span">
              Peso Usuário Secundário: {subcategory.secondaryUserWeight}%
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SubcategoryItem;
