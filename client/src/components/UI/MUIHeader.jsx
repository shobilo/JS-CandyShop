import { useState, useCallback, memo } from 'react'
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
import { Stack } from '@mui/material'

const MUIHeader = (props) => {
  const { pages, settings, logo, title } = props
  const { userName = "Login or register" } = props.userSettings
  
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
    <Container maxWidth="lg" sx={{padding: "0px"}}>
      <AppBar position="static" style={{ background: "#FFF5EE",}}>
        <Container maxWidth="md">


          <Toolbar disableGutters>

              

            <ClearLink to="/">
              <Stack direction="row"  spacing={2}>
                <img 
                    src={logo.src}
                    alt={logo.alt}
                    height="40vh"// 
                  />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, alignItems: "center" ,display: { xs: 'none', md: 'flex' } }}
                >
                  {title}
                </Typography>
              </Stack>
              
            </ClearLink>

            

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
              sx={{ flexGrow: 1, color: "black", display: { xs: 'flex', md: 'none' } }}
            >
              {title}
            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <ClearLink to={page.link} key={page.name}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </ClearLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              
              <Tooltip title="Open user settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }} size="large">

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

            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
    
  );
};

MUIHeader.propTypes = {
  logo: PropTypes.objectOf(
    PropTypes.node,
    PropTypes.string
  ),
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
    PropTypes.string
  ),
  title: PropTypes.string
}

MUIHeader.defaultProps = {
  title: "Shop",
  logo: {
    src: "",
    alt: "CandyShop Logo"
  },
  pages: [],
  settings: [],
  userSettings: {
    userName: "No name",
  }
}


export default memo(MUIHeader);