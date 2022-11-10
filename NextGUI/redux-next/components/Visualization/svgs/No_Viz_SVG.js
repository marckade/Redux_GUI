
import React from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography,Card } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const No_Viz_Svg = () => {
    

    
    return (
        
        <Box
        >
            
            <Card variant="outlined"
                sx={{
             bgcolor: 'primary.lGray',
             boxShadow: 1,
             borderRadius: 2,
             p: 2,
             minWidth: 300
                }}
                >
            <ErrorOutlineIcon
                fontSize="large"
            >
            </ErrorOutlineIcon>

                
            {/* <h1 style={{color: "orange"}}> No visualization is Currently implemented!</h1>
                <p>No visualization is Currently Implemented!</p> */}
            <Typography variant="h2" component="h2" style={{ color: 'black',fontWeight:'bold', textAlign: 'center'}} >
                No visualization is currently implemented
                for this problem
        </Typography>
        </Card>
            
    </Box>
    )
}

export default No_Viz_Svg;