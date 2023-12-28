import React from 'react';
import { useNavigate } from '@remix-run/react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  title: string;
  children: React.ReactNode;
};

const ModalBackdropStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(2px)',
  zIndex: 1200,
};

const ModalBoxStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  backgroundColor: 'background.paper',
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

export default function ModalLikeWrapper({ title, children }: ModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={ModalBackdropStyles} onClick={handleClose} />
      <Box sx={ModalBoxStyles}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>{children}</Box>
      </Box>
    </>
  );
}
