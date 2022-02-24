import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import ClearLink from '../UI/ClearLink'

const MUIHeader = (props) => {
  const { pages, settings, title } = props
  const { isAuth, userName } = props.userSettings
  
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, [])

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, [])

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, [])

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, [])

  return (
    <AppBar position="static" style={{ background: "grey"}}>
      <Container maxWidth="xl">


        <Toolbar disableGutters>
        
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <ClearLink to="/">
              {title}
            </ClearLink>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <ClearLink to={page.link} key={page.name}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </ClearLink>
                
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {title}
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <ClearLink to={page.link} key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </ClearLink>
            ))}
          </Box>

          {isAuth && 
          <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open user settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>

                <Typography textAlign="center">{userName}</Typography>

                <AccountCircle />

              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <ClearLink to={setting.link} key={setting.name}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </ClearLink>
              ))}
            </Menu>

          </Box>}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MUIHeader.propTypes = {
  title: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
      )
  ),
  settings: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
      )
  ),
  userSettings: PropTypes.objectOf(
    PropTypes.oneOfType(
      PropTypes.string,
      PropTypes.bool
    )
  )
}

MUIHeader.defaultProps = {
  title: "No name",
  pages: [],
  settings: [],
  userSettings: {}
}


export default MUIHeader;