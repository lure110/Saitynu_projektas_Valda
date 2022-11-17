import { Avatar, Box, Button, Card, Checkbox, Dialog, DialogContent, IconButton, InputLabel, MenuItem, NativeSelect, Paper, Popover, Select, SelectChangeEvent, Slide, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const API_URL = "api";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserPage() {
    const [userId, setUserId] = useState(null);
    const [open, setOpen] = useState<EventTarget & Element | null>(null);
    const [refresh, setRefresh] = useState(false);
    const handleOpenMenu = (event:SyntheticEvent) => {
        setOpen(event.currentTarget);
    }
    const handleCloseMenu = () => {
        setOpen(null);
    };
    
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const config = {
                    withCredentials:true,
                    headers:{
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.get(`${API_URL}/users`, config);
                setUsers(response.data);
            } catch (error) {
                setError("Error occured");
            } finally {
                setLoaded(true);
            }
        })();
    }, [refresh]);
    const [role, setRole] = useState<string>('');
    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    }
    const [props, setProps] = useState({});
    const [openNew, setOpenNew] = useState<EventTarget & Element | null>(null);
    const handleOpenNew = (event:SyntheticEvent) => setOpenNew(event.currentTarget);
    const handleCloseNew = () => setOpenNew(null);
    const handleSubmitNew = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('password') !== data.get('re-password')){
            setProps({
                error: true,
                helperText: 'Does not match with password'
            })
            return;
        }else{
            setProps({});
        }
        (async () => {
            try {
                const json = JSON.stringify(
                    {
                        name:data.get("name"),
                        email:data.get("email"),
                        password:data.get("password"),
                        role:data.get("role")
                    }
                );
                const response = await axios.post(`api/users`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json'
                    }
                });

                if ( response.status === 201) {
                    if(refresh) setRefresh(false); else setRefresh(true);
                    handleCloseNew();
                }
            } catch {

            } finally {

            }
        })();
    }
    const [propsEdit, setPropsEdit] = useState({});
    const [openEdit, setOpenEdit] = useState<EventTarget & Element | null>(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [repass, setRepass] = useState("");
    const handleChangeInputName = (event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleChangeInputEmail = (event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleChangeInputRePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setRepass(event.target.value);
    }
    const handleOpenEdit = (event:SyntheticEvent) => setOpenEdit(event.currentTarget);
    const handleCloseEdit = () => setOpenEdit(null);
    const handleSubmitEdit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('password') === "") {
            setPropsEdit({
                error: true,
                helperText: "Password cannot be empty when editing whole user"
            });
            return;
        }else {setPropsEdit({});}
        (async () => {
            try {
                const json = JSON.stringify(
                    {
                        "name": data.get('name'),
                        "email": data.get('email'),
                        "password": data.get('password')
                    }
                );
                const response = await axios.patch(`api/users/${userId}`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    if(refresh) setRefresh(false); else setRefresh(true);
                    handleCloseEdit();
                }

            } catch (error) {

            } finally {
            }
        })();
    }

    const handleDelete = () => {
        (async () => {
            try {
                const response = await axios.delete(`api/users/${userId}`, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                });

                if (response.status === 204) {
                    if(refresh) setRefresh(false); else setRefresh(true);
                }
            } catch (error) {
                
            } finally {

            }
        })();
    }
    return (
    <>
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenNew}>
            New User
          </Button>
        </Stack>
        <Card>
            <TableContainer sx={{minWidth: 800 }}>
                <Table>
                    <TableBody>
                        {users.map((row) => {
                            const {id, name, email, role} = row;
                            return (
                                <TableRow hover key={id} tabIndex={-1} >
                                    <TableCell component="th" scope="row" padding="none" 
                                    sx={{
                                        paddingLeft: 2
                                    }}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={name} src={"AVATARURL"} />
                                            <Typography variant="subtitle2" noWrap>
                                                {name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{email}</TableCell>
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="large" color="inherit" onClick={
                                            function(event) {
                                                handleOpenMenu(event);
                                                setName(name);
                                                setEmail(email);
                                                setRole(role);
                                                setUserId(id);
                                            }
                                            
                                            }>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    </Container>

    <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{
            sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                    px: 1,
                    typography: 'body2',
                    borderRadius: 0.75
                },
            },
        }}
    >
        <MenuItem onClick={
            function (event) {
                handleOpenEdit(event);
                handleCloseMenu();

            }}>
            <EditIcon sx={{mr: 2}}/>
            Edit
        </MenuItem>
        <MenuItem onClick={function(event) {
            handleDelete();
            handleCloseMenu();
        }}>
            <DeleteIcon sx={{mr: 2}} />
            Delete
        </MenuItem>
    </Popover>
    <Dialog
        open={Boolean(openNew)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseNew}
        aria-describeby="new-user-modal"
    >
        <DialogContent>
            <Typography
                component="h1"
                variant="h5"
                sx={{textAlign: 'center', marginTop: '5px'}}
            >
                Create new user
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmitNew}
                sx={{mt: 1}}
            >
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                />
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email which will be used to login"
                    name="email"
                    type="email"
                    autoFocus
                        />
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoFocus
                />
                <TextField
                    {...props}
                    margin="normal"
                    required
                    fullWidth
                    id="re-password"
                    label="Re-enter password"
                    name="re-password"
                    type="password"
                    autoFocus
                    defaultValue=""
                    autoComplete='none'
                    value={repass}
                    onChange={handleChangeInputRePassword}
                />
                <InputLabel id="select_role_label">
                    Role
                </InputLabel>
                <NativeSelect
                    defaultValue="Manager"
                    inputProps={{
                        name: 'role',
                        id: 'role_select'
                    }}
                >
                    <option value="Manager">Manager</option>
                    <option value="Administrator">Administrator</option>
                </NativeSelect>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Submit
                </Button>
            </Box>
        </DialogContent>
    </Dialog>
    <Dialog
        open={Boolean(openEdit)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEdit}
    >
        <DialogContent>
        <Typography
            component="h1"
            variant="h5"
            sx={{textAlign: 'center', marginTop: '5px'}}
        >
            Edit user
        </Typography>
        <Box
            component="form"
            onSubmit={handleSubmitEdit}
            sx={{mt: 1}}
            >
            <TextField 
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={handleChangeInputName}
                autoFocus
            />
            <TextField 
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email which will be used to login"
                name="email"
                value={email}
                onChange={handleChangeInputEmail}
                autoFocus
                inputProps={{
                    autoComplete:'none'
                }}
            />
            <TextField 
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                defaultValue=""
                autoComplete="new-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Submit
            </Button>
        </Box>
        </DialogContent>
    </Dialog>
    </>
    );
}