import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Face6Icon from '@mui/icons-material/Face6';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Generator from './Generator';
import SavedPasswords from './SavedPasswords';
import { useDispatch } from 'react-redux';
import { logout } from '../Slice/userSlice';
import { useState } from 'react';


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/generate')}>
              <ListItemIcon>
                <AddBoxIcon/>
              </ListItemIcon>
              <ListItemText primary='Generate'/>
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => navigate('/saved')}>
              <ListItemIcon>
                <BookmarkIcon/>
              </ListItemIcon>
              <ListItemText primary='Saved'/>
            </ListItemButton>
          </ListItem>     
          <ListItem  disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Face6Icon/>
              </ListItemIcon>
              <ListItemText primary='Logout'/>
            </ListItemButton>
          </ListItem>               
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#37474f',
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
          <Typography variant="h6" noWrap component="div">
            Password Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

            <Routes>
                <Route path="/generate" element={<Generator />} />
                <Route path="/saved" element={<SavedPasswords />} />
            </Routes>

      </Box>
    </Box>
  );
}



export default Navbar