import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import AddTaskModal from '../../components/modals/AddTaskModal'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const ResponsiveDrawer = (props: Props): JSX.Element => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Main'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected>
              <ListItemIcon>
                <SpaceDashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
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
          <AddTaskModal />
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
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ResponsiveDrawer
