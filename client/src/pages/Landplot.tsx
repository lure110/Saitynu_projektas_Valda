import { Box, Button, Card, Container, Dialog, DialogContent, IconButton, MenuItem, Popover, Slide, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { SyntheticEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { TransitionProps } from "@mui/material/transitions";

const API_URL = "api";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Landplots() {
    const [refresh, setRefresh] = useState(false);
    const [landplots, setLandplots] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                const id = location.state.id;
                const config = {
                    withCredentials:true,
                    headers:{
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.get(`api/regions/${id}/landplots`, config);
                setLandplots(response.data);
            } catch (error) {

                setError("Error occured");
            } finally {
                setLoaded(true);
            }
        })();
    }, [refresh]);


    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState<EventTarget & Element | null>(null);
    const [landplotId, setLandplotId] = useState(null);
    const [landplotOwner, setLandplotOwner] = useState<string | null>(null);
    const handleOpenMenu = (event:SyntheticEvent) => setOpen(event.currentTarget);

    const handleCloseMenu = () => setOpen(null);

    const toBuildings = () => {
        navigate('/Buildings', {state:{id:landplotId,regionId:location.state.id, owner:landplotOwner}});
    }

    /* */
    const [openNew, setOpenNew] = useState<EventTarget & Element | null>(null);
    const handleOpenNew = (event:SyntheticEvent) => {
        setOpenNew(event.currentTarget);
    }
    const handleCloseNew = () => setOpenNew(null);
    const handleSubmitNew = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        (async () => {
            try {
                const json = JSON.stringify({
                    address: data.get('address'),
                    owner: data.get('owner')
                });
                const response = await axios.post(`${API_URL}/regions/${location.state.id}/landplots`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }});
                if(response.status === 201) {
                    setOpenNew(null);
                }
            } catch (error) {

            } finally {
                if(refresh) setRefresh(false); else setRefresh(true);
            }
        })();
    }
    /* */
    const handleDelete = () => {
        handleCloseMenu();
        (async () => {
            try {
                const config = {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.delete(`api/regions/${location.state.id}/landplots/${landplotId}`, config);
                if(response.status === 204) {

                }
            } catch (e) {
                
                
            } finally {
                if(refresh) setRefresh(false); else setRefresh(true);
            }
        })();
    }
    /* */
    const [openEdit, setOpenEdit] = useState<EventTarget & Element | null>(null)
    const [landplotAddress, setLandplotAddress] = useState("");
    
    const handleInputChangeOwner = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setLandplotOwner(event.target.value);
    }

    const handleOpenEdit = (event:SyntheticEvent) => {
        setOpenEdit(event.currentTarget);
    }
    const handleCloseEdit = () => setOpenEdit(null);
    const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            (async () =>{
                const json = JSON.stringify({
                    owner: data.get("owner")
                });
                const response = await axios.patch(`api/regions/${location.state.id}/landplots/${landplotId}`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }
                });
                if(response.status === 200) {
                    if(refresh) setRefresh(false); else setRefresh(true);
                    setOpenEdit(null);
                }
            })();
            
        } catch (error) {

        } finally {

        }
    }
    /* */
    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                <Typography variant="h4" gutterBottom>
                    Landplots of region: {location.state.name}
                </Typography>
                {
                localStorage.getItem('role') === "Administrator" && 
                <Button variant="contained" startIcon={<AddIcon />}
                    onClick={ function(event) {
                        handleOpenNew(event);
                    }}
                >
                    New landplot
                </Button>
                }
            </Stack>
            <Card>
                <TableContainer sx={{minWidth:200}}>
                    <Table>
                        <TableBody>
                            {landplots.map((row) => {
                                const {id, address, owner} = row;
                                return (
                                    <TableRow hover key={id} tabIndex={-1}>
                                        <TableCell align="left">{address}</TableCell>
                                        <TableCell align="left">{owner}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit"
                                                onClick={ function(event) {
                                                    handleOpenMenu(event);
                                                    setLandplotId(id);
                                                    setLandplotOwner(owner);
                                                    setLandplotAddress(address);
                                            }}>
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
                }
            }}
        >
            <MenuItem onClick={toBuildings}>
                <AutoAwesomeMotionIcon sx={{mr: 2}}/>
                Buildings
            </MenuItem>
            {
            localStorage.getItem('role') === "Administrator" && 
            <>
            <MenuItem onClick={function(event) {
                handleOpenEdit(event);
                handleCloseMenu(); 
                }}>
                <EditIcon sx={{mr:2}}/>
                Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                <DeleteIcon sx={{mr: 2}}/>
                Delete
            </MenuItem>
            </>
            }
        </Popover>
        <Dialog
                open={Boolean(openNew)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNew}
                aria-describeby="new-landplot-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Create new landplot
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
                            id="address"
                            label="Address of the landplot"
                            name="address"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="owner"
                            label="Owner first and last name"
                            name="owner"
                            autoFocus
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
            <Dialog
                open={Boolean(openEdit)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEdit}
                aria-decribeby="edit landplot"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign:"center", marginTop:"5px"}}
                    >
                        Edit landplot of {landplotAddress}
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
                            id="owner"
                            label="Owner first and last name"
                            name="owner"
                            autoFocus
                            value={landplotOwner || ''}
                            onChange={handleInputChangeOwner}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt:3, mb:2}}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );

}