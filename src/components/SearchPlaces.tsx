import { Fab, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import NavigationIcon from '@mui/icons-material/Navigation';

import "./styles/searchPlaces.scss"

const SearchPlaces = () => (
    <div className="search-form">
        <Box component="section">
            <TextField id="outlined-basic"
                label="Place"
                variant="outlined"
                placeholder="write the place name"
                sx={{ margin: "10px", color: "black" }} />
            <Fab variant="extended">
                <NavigationIcon sx={{ mr: 1 }} />
                Use current location
            </Fab>
        </Box>
    </div>
)

export default SearchPlaces