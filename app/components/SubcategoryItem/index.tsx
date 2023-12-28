import React from 'react';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from '@remix-run/react';
import { Subcategory } from '~/types/subcategory';

type SubcategoryItemProps = {
  subcategory: Subcategory;
};

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({ subcategory }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/subcategories/${subcategory.id}/edit`);
  };

  const handleDelete = () => {
    navigate(`/dashboard/subcategories/${subcategory.id}/delete`);
  };

  return (
    <ListItem>
      <ListItemText primary={subcategory.name} />
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
