import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { SyntheticEvent, useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Box, Button, Card, Container, Dialog, DialogContent, IconButton, 
    MenuItem, Popover, Slide, Stack, Table, TableBody, TableCell, 
    TableContainer, TableRow, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { TransitionProps } from '@mui/material/transitions';

const API_URL = "api";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Buildings() {
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    if(location.state === null) {
        navigate('/Dashboard');
    }
    const [buildings, setBuildings] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                const config = {
                    withCredentials:true,
                    headers: {
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                }; 
                const response = await axios.get(`${API_URL}/regions/${location.state.regionId}/landplots/${location.state.id}/buildings`, config);
                setBuildings(response.data);
            } catch (error) {
                setError("Some error occured");
            } finally {
                setLoaded(true);
            }
        })();
    }, [refresh]);    
    
    const [open, setOpen] = useState<EventTarget & Element | null>(null);
    const [buildingId, setBuildingId] = useState(null);
    const [buildingName, setBuildingName] = useState(null);

    const handleOpenMenu = (event:SyntheticEvent) => setOpen(event.currentTarget);

    const handleCloseMenu = () => setOpen(null);
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
                    name: data.get('name'),
                    type: data.get('type'),
                    size: data.get('size'),
                    occupancy: data.get('occupancy')
                });
                const response = await axios.post(`${API_URL}/regions/${location.state.regionId}/landplots/${location.state.id}/buildings`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }});
                if(response.status === 201) {
                    handleCloseNew();
                }
            } catch (error) {

            } finally {
                if (refresh) setRefresh(false); else setRefresh(true);
            }
        })();
    }
    /* */
    const [openEdit, setOpenEdit] = useState<EventTarget & Element | null>(null);
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [occupancy, setOccupancy] = useState("");
    const [occupancyNum, setOccupancyNum] = useState<number>(0);
    const handleInputChangeType = (e:React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    }
    const handleInputChangeSize = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSize(e.target.value);
    }
    const handleInputChangeOccupancy = (e:React.ChangeEvent<HTMLInputElement>) => {
        setOccupancy(e.target.value);
    }
    const handleInputChangeOccupancySlider = (event: Event, newValue: number | number[]) => {
        setOccupancyNum(newValue as number)
    }
    const handleOpenEdit = (event: SyntheticEvent) => {
        setOpenEdit(event.currentTarget);
    }
    const handleCloseEdit = () => setOpenEdit(null);

    const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        (async () => {
            try {
                const json = JSON.stringify({
                    type: data.get('type'),
                    size: data.get('size'),
                    occupancy: data.get('occupancy')
                });
                const response = await axios.patch(`${API_URL}/regions/${location.state.regionId}/landplots/${location.state.id}/buildings/${buildingId}`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }
                });
                if(response.status === 200) {
                    if (refresh) setRefresh(false); else setRefresh(true);
                    setOpenEdit(null);
                }
            } catch (error) {

            } finally {

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
                        withCredentials: true,
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.delete(`${API_URL}/regions/${location.state.regionId}/landplots/${location.state.id}/buildings/${buildingId}`, config);
            } catch (error) {

            } finally {
                if(refresh) setRefresh(false); else setRefresh(true);
            }
        })();
    }
    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                <Typography variant="h4" gutterBottom>
                    Buildings of landplot owner: {location.state.owner}
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}
                onClick={ function(event) {
                    handleOpenNew(event);
                }}>
                    New building
                </Button>
            </Stack>
            <Card>
                <TableContainer sx={{minWidth:200}}>
                    <Table>
                        <TableBody>
                            {buildings.map((row) => {
                                const {id, name, occupancy, size, type} = row;
                                return(
                                    <TableRow hover key={id} tabIndex={-1}>
                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="left">{occupancy}</TableCell>
                                        <TableCell align="left">{size}</TableCell>
                                        <TableCell align="left">{type}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit"
                                                onClick={ function(event) {
                                                    handleOpenMenu(event);
                                                    setBuildingId(id);
                                                    setBuildingName(name);
                                                    setType(type);
                                                    setSize(size);
                                                    setOccupancy(occupancy);
                                                    setOccupancyNum(occupancyNum);
                                                }}
                                            >
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
            <MenuItem onClick={
                function(event) {
                    handleOpenEdit(event);
                    handleCloseMenu();
                }
            }>
                <EditIcon sx={{mr:2}}/>
                Edit
            </MenuItem>
            {
                localStorage.getItem('role') === "Administrator" && 
            <MenuItem onClick={handleDelete}>
                <DeleteIcon sx={{mr:2}}/>
                Delete
            </MenuItem>
            }
        </Popover>
        <Dialog
                open={Boolean(openNew)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNew}
                //aria-describeby="new-building-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Create a new building
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
                            label="Name of building"
                            name="name"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            label="Type of grain stored in building"
                            name="type"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="size"
                            label="Size of the storage"
                            name="size"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="occupancy"
                            label="Amount of space is already occupied"
                            name="occupancy"
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
                //aria-describeby="edit-building-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Edit building {buildingName}
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
                            id="type"
                            label="Type of grain stored in building"
                            name="type"
                            autoFocus
                            onChange={handleInputChangeType}
                            value={type || ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="size"
                            label="Size of the storage"
                            name="size"
                            autoFocus
                            onChange={handleInputChangeSize}
                            value={size || ''}
                        />
                        <Typography gutterBottom>Amount of space is already occupied</Typography>
                        <Slider 
                            aria-label="occupied space"
                            valueLabelDisplay="auto"
                            onChange={handleInputChangeOccupancySlider}
                            value={occupancyNum}
                            max={Number(size)}
                            id="occupancy"
                            name="occupancy"
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