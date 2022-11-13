import { AppBar, Box, colors, createStyles, makeStyles, Theme, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import AdbIcon from '@mui/icons-material/Adb';
import * as React from 'react';
import { ClassNames } from '@emotion/react';
import { inherits } from 'util';


export default function Footer() {
    return (
            <Container 
            sx={{
                backgroundColor: "#525252",
                position: 'fixed', 
                bottom: '0', 
                display: { xs: 'none', md: 'flex' },
                left: '0',
                right: '0',
                margin: '0 auto'
            }}
            >
                <Toolbar disableGutters>
                    Footer
                </Toolbar>
            </Container>
    );
}