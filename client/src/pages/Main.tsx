import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";

import WeekendIcon from '@mui/icons-material/Weekend';

const Main = () => {
    return (
       <Container>
        <Box>
            <Typography
            variant="h3"
            component="h2"
            mt={10}
            sx={{
                textAlign: "center"
            }}
            >
                Welcome to VALDA web-site.
            </Typography>
            <Typography
                mt={5}
                sx={{
                    textAlign:"center",
                }}
            >
                <WeekendIcon 
                    fontSize="large"
                    sx={{
                        fontSize:"8rem"
                    }}
                    href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
                />
            </Typography>

        </Box>
       </Container>
    );
}
export default Main;