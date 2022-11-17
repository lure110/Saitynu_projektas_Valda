import { AppBar, Box, colors, createStyles, makeStyles, Stack, Theme, Toolbar, Typography } from '@mui/material';
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
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} mt={1}>
                    <Typography variant="h5" color="whitesmoke">
                        Created by Arnas Abromavičius IFF-9/2
                    </Typography>
                </Stack>
            </Container>
    );
}