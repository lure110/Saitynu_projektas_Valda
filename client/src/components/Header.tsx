import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { LoginButton, useVerify } from './Authentication';
import { CircularProgress } from '@mui/material';

const logoName = "VALDA";

export default function Header() {
    const pages = ['Dashboard'];
    const adminPages = ['Users'];
    const settings = ['Profile'];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {isAuth, error, loaded} = useVerify();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    
    if(localStorage.getItem("role") === "Administrator") {
        settings.push(...adminPages);
    }
    settings.push('Logout');

    let profileProp = <LoginButton />;
    
    if (isAuth && loaded){
        profileProp = <>                     
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={`${localStorage.getItem('name')}`} src="/static/images/avatar/2.jpg" />
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
                {
                    settings.map((setting) => {
                        return (
                            <NavLink to={`/${setting}`}>
                            <MenuItem 
                                key={setting} onClick={handleCloseUserMenu}
                            >
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem></NavLink>
                        );
                    })}
            </Menu>
        </Box> </>;
    }
    if (!loaded) {
        profileProp = <>
            <Box
                sx={{ display: 'flex', width: '90px', justifyContent: 'space-evenly' }}
            >
                <CircularProgress sx={{color: 'white'}} />
            </Box>
        </>;
    }

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr:2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to={`/`}>{logoName}</NavLink> 
                    </Typography>
                        {/* MOBILE */}
                        <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'}} }>
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
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <NavLink to={`/${page}`}>
                                    <MenuItem 
                                        key={page} 
                                        onClick={handleCloseNavMenu} 
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem></NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none'}, mr:1 }} />
                        <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        >
                            <NavLink to={`/`}>{logoName}</NavLink> 
                        </Typography>
                        {/* DESKTOP */}
                        <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <NavLink to={`/${page}`} >
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button></NavLink>
                            ))}
                        </Box>
                        {/* USER PROFILE UI*/} 
                        {profileProp}
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}

