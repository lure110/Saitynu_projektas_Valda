import { Navigate, Outlet } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { ReactElement, useEffect, useState } from "react";
import { Avatar, Box, Button, Checkbox, CircularProgress, Dialog, 
    DialogActions, DialogContent, DialogContentText, DialogTitle, 
    FormControlLabel, Grid, Slide, TextField, Typography, Link, Snackbar, Alert } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Cookies from "js-cookie";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import jwt_decode from "jwt-decode";

const API_URL = "https://localhost:7194/auth";

export const useVerify = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                //await new Promise(request => setTimeout(request, 1000))
                if(Cookies.get("access_token") != null){
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
                /*
                const config = {
                    withCredentials:true,
                    headers:{
                        access_token: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await (await axios.get(`${API_URL}/verify`, config));
                if (response.status === 200)
                    setIsAuth(true);
            */
            } catch (error) {
                setError("Error occured during authentication process");
            } finally {
                setLoaded(true);
            }
        })();
    }, []);
    return {isAuth, error, loaded};
}

const ProtectedRoutes = () => {
    const { isAuth, error, loaded } = useVerify();

    if (loaded) {
        return (
            isAuth ? <Outlet/> : <Navigate to="/"/>
        );
    }
    return (
        <></>
    );
}
export default ProtectedRoutes;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const LoginButton = () => {
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // MSG
    const handleClickClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        (async () => {
            setLoaded(false);
            try {
                console.log(data.get('remember'));
                const json = JSON.stringify(
                    {
                        email: data.get('email'),
                        password: data.get('password')
                    });
                console.log(json);
                const response = await (await axios.post(`${API_URL}/login`, json, {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }));
                if (response.status === 200) {
                    setIsAuth(true);
                    const access = jwt_decode(response.data['accessToken']) as {[key:string]: any};
                    const refresh = jwt_decode(response.data['refreshToken']) as {[key:string]: any};
                    if(data.get('remember') === 'remember' ) {
                        Cookies.set("access_token", response.data['accessToken'], {expires: (new Date(access['exp']*1000))});
                        Cookies.set("refresh_token", response.data['refreshToken'],{expires: (new Date(refresh['exp']*1000))} );
                    } else {
                        Cookies.set("access_token", response.data['accessToken']);
                        Cookies.set("refresh_token", response.data['refreshToken']);
                    }
                    localStorage.setItem('role', access["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
                    localStorage.setItem('name', access["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
                    localStorage.setItem('identifier', access["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                    

                } else if (response.status === 401 || response.status === 404) {
                    setError("Invalid log in credentials");
                    setErrorOpen(true);
                }

            } catch (error) {
                if( error instanceof AxiosError) {
                    console.log(error.response?.status);
                    if ( error.response?.status === 401) {
                        setError("Invalid login credentials");
                        setErrorOpen(true);
                    } else {
                        setError("Server could not process the input");
                        setErrorOpen(true);
                    }
                }
            } finally {
                setLoaded(true);
            }
        })();
    }
    let renderDialog;
    if(!isAuth && loaded) {
        renderDialog = <>
                <Snackbar
                    open={errorOpen}
                    autoHideDuration={6000}
                    onClose={handleClickClose}
                >
                    <Alert 
                        onClose={handleClickClose} 
                        severity="error" 
                        sx={{width:'100%'}}
                    >
                        {error}
                    </Alert>
                </Snackbar>
                <DialogContent>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin: 'auto' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate sx={{mt: 1}}
                    >
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel 
                            control={<Checkbox value="remember" color="primary" id="remember" name="remember" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>
                        {/*}
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        {*/}
                    </Box>
                </DialogContent>
        </>;
    }

    if(!loaded) {
        renderDialog = <>
            <DialogContent>
                <Box
                    sx={{ display: 'flex',  justifyContent: 'space-evenly' }}
                >
                    <CircularProgress color="success" />
                </Box>
            </DialogContent>

        </>;
    }

    if(isAuth && loaded) {
        window.location.href= "http://localhost:3000/Dashboard";
        renderDialog = <><Navigate to="/Dashboard"/>
        </>;
    }

    return (
        <Box>
            <Button
                variant="outlined"
                startIcon={<LoginIcon />}
                sx={{ color: 'white', display: 'block', width: '90px' }}
                onClick={handleOpen}
            >
                Log in
            </Button>
            <Dialog 
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describeby="login-modal"
            >
                {renderDialog}
            </Dialog>
        </Box>
    );
}