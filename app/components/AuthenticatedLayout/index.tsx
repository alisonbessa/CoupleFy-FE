import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from '@remix-run/react';

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 200;

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ flexGrow: 1 }}
          >
            CoupleFy
          </Typography>
          <Button color="inherit" href="/logout">
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Box style={{ width: drawerWidth, paddingTop: 24 }}>
          <Toolbar />
          <div style={{ overflow: 'auto' }}>
            <Box display="flex" justifyContent="center">
              Menu
            </Box>
            <List disablePadding>
              <ListItem component="a" href="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem component="a" href="/transactions">
                <ListItemText primary="Transações" />
              </ListItem>
            </List>
            <ListItem onClick={handleClick} style={{ cursor: 'pointer' }}>
              <ListItemText primary="Cadastros" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem style={{ paddingLeft: 32 }}>
                  <Link to={'/dashboard/categories'}>Categorias</Link>
                </ListItem>
                <ListItem
                  component="a"
                  href="/dashboard/subcategories"
                  style={{ paddingLeft: 32 }}
                >
                  <ListItemText primary="Subcategorias" />
                </ListItem>
                {/* TODO: Add other options here */}
              </List>
            </Collapse>
          </div>
        </Box>
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          padding: 3,
          marginLeft: drawerWidth,
          marginTop: '64px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
