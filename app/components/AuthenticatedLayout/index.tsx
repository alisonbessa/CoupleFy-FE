import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, Box, Link } from '@mui/material';

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 200;

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1 }}>
            CoupleFy
          </Typography>
          <Button color="inherit" href="/logout">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
      >
        <Box style={{ width: drawerWidth, paddingTop: 24 }}>
          <Toolbar />
          <div style={{ overflow: 'auto' }}>
            <Box display="flex" justifyContent="center">Menu</Box>
            <List>
              <ListItem component="a" href="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
            
            <List>
              <ListItem component="a" href="/transactions">
                <ListItemText primary="Transações" />
              </ListItem>
            </List>
            
            <List>
              <ListItem component="a" href="/categories">
                <ListItemText primary="Categorias" />
              </ListItem>
            </List>
            
            <List>
              <ListItem component="a" href="/subcategories">
                <ListItemText primary="Subcategorias" />
              </ListItem>
            </List>
            
          </div>
        </Box>
      </Drawer>
      <main style={{ flexGrow: 1, padding: 3, marginLeft: drawerWidth, marginTop: '64px' }}>
        {children}
      </main>
    </div>
  );
}
