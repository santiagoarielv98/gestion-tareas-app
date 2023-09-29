import React from 'react';
import { Outlet } from 'react-router-dom';

import { ListSubheader, useMediaQuery } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}
const AddTaskModal = React.lazy(async () => await import('../../components/modals/AddTaskModal'));

const DrawerContent = (): JSX.Element => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Kanban
        </Typography>
      </Toolbar>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            all boards
          </ListSubheader>
        }
      >
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <SpaceDashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Board 1" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'add new board'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

const ResponsiveDrawer = (props: Props): JSX.Element => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#fff',
          color: '#000',
          borderBottom: '1px solid',
          borderColor: '#e0e0e0'
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add New Task
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          {...(!isDesktop && {
            container,
            anchor: 'left',
            onClose: handleDrawerToggle,
            ModalProps: {
              keepMounted: true
            }
          })}
          variant={isDesktop ? 'permanent' : 'temporary'}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open={isDesktop ? true : mobileOpen}
        >
          {<DrawerContent />}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <React.Suspense fallback={null}>
        {open && (
          <AddTaskModal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </React.Suspense>
    </Box>
  );
};

export default ResponsiveDrawer;
