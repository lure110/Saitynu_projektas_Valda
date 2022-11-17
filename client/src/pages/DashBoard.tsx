import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Button, Card, Container, Dialog, DialogContent, IconButton, MenuItem, Popover, 
    Slide, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { useNavigate } from 'react-router';
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

export default function Dashboard() {
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState<EventTarget & Element | null>(null);
    const [regionId, setRegionId] = useState(null);
    const [regionName, setRegionName] = useState<string | null>(null);
    const navigate = useNavigate();

    const [regions, setRegions] = useState([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                const config = {
                    withCredentials:true,
                    headers:{
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.get(`${API_URL}/regions`, config);
                setRegions(response.data);
            } catch (error) {
                setError("Error occured");
            } finally {
                setLoaded(true);
            }
        })();
    }, [refresh]);

    const handleOpenMenu = (event:SyntheticEvent) => {
        setOpen(event.currentTarget);
    }
    const handleCloseMenu = () => setOpen(null);

    const toLandplots = () => {
        navigate('/Landplots', {state:{id:regionId, name:regionName}});
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
                    country: data.get('country'),
                    name: data.get('name'),
                    description: data.get('description')
                });
                const response = await axios.post(`${API_URL}/regions`, json, {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }});
                if(response.status === 201) {
                    if(refresh) setRefresh(false); else setRefresh(true);
                    handleCloseNew();
                }
            } catch (error) {

            } finally {

            }
        })();
    }
    /* */
    const handleDelete = () => {
        // must add are y sure window
        // must check if there are child nodes left
        handleCloseMenu();
        (async () => {
            try {    
                const config = {
                    headers: {
                        withCredentials:true,
                        Authorization: "Bearer " + Cookies.get('access_token')
                    }
                };
                const response = await axios.delete(`api/regions/${regionId}`, config);
            } catch (error) {
    
            } finally {
                if(refresh) setRefresh(false); else setRefresh(true);
            }
        })();

    };
    /* */
    const [openEdit, setOpenEdit] = useState<EventTarget & Element | null>(null);
    const [description, setDescription] = useState("");

    const handleInputChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleOpenEdit = (e:SyntheticEvent) => setOpenEdit(e.currentTarget);
    const handleCloseEdit = () => setOpenEdit(null);
    const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        (async () => {
            try {
                const json = JSON.stringify({
                    description:data.get('description')
                });
                const response = await axios.patch(`api/regions/${regionId}`, json, {
                    headers: {
                        withCredentials: true,
                        Authorization: "Bearer " + Cookies.get('access_token'),
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin":"*"
                    }
                });
                if(response.status === 200) {
                    if (refresh) setRefresh(false); else setRefresh(true);
                    handleCloseEdit();
                }
            } catch (error) {

            } finally {

            }
        })();
    } 
    /* */
    const [openViewMore, setOpenViewMore] = useState<EventTarget & Element | null>(null);
    
    const handleOpenViewMore = (e:SyntheticEvent) => setOpenViewMore(e.currentTarget);
    const handleCloseViewMore = () => setOpenViewMore(null);

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                    <Typography variant="h4" gutterBottom>
                        Regions
                    </Typography>
                    {
                    localStorage.getItem('role') === "Administrator" && 
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={ function(event) {
                            handleOpenNew(event);
                        }}
                    >
                        New Region
                    </Button>
                    }
                </Stack>
                <Card>
                    <TableContainer sx={{minWidth:200}}>
                        <Table>
                            <TableBody>
                                {regions.map((row) => {
                                    const {id, country, name, description} = row;
                                    return (
                                        <TableRow hover key={id} tabIndex={-1} >
                                            <TableCell align="left">{country}</TableCell>
                                            <TableCell align="left">{name}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit" 
                                                onClick={ function(event){
                                                    handleOpenMenu(event);
                                                    setRegionId(id);
                                                    setRegionName(name);
                                                    setDescription(description);
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
                    },
                }}
            >   
                <MenuItem onClick={toLandplots}>
                    <AutoAwesomeMotionIcon sx={{mr: 2}}/>
                    Landplots
                </MenuItem>
                <MenuItem
                    onClick={function(event) {
                        handleOpenViewMore(event);
                        handleCloseMenu();
                    }}
                >
                    <ReadMoreIcon sx={{mr: 2}}/>
                    View more
                </MenuItem>
                {
                localStorage.getItem('role') === "Administrator" && 
                <>
                <MenuItem
                    onClick={function(event) {
                        handleOpenEdit(event);
                        handleCloseMenu();
                    }}
                >
                    <EditIcon sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon sx={{ mr: 2 }} />
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
                aria-describeby="new-region-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Create new region
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
                            id="country"
                            label="Country"
                            name="country"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name of region"
                            name="name"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description of the region"
                            name="description"
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
                aria-describeby="edit-region-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop: '5px'}}
                    >
                        Edit region {regionName}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmitEdit}
                        sx={{mt: 1}}
                        minWidth={400}
                    >
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description of the region"
                            name="description"
                            autoFocus
                            multiline
                            value={description || ""}
                            onChange={handleInputChangeDescription}
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
                open={Boolean(openViewMore)}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseViewMore}
                aria-describeby="description-modal"
            >
                <DialogContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{textAlign: 'center', marginTop:'5px'}}
                    >
                        Description of {regionName}
                    </Typography>
                    <Box>
                        <Typography
                            component="p"
                        >
                            {description}
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}