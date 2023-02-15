
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography,Card } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ProblemContext } from '../../contexts/ProblemProvider';
import { ProblemParser } from '../../../Tools/ProblemParser';


const No_Viz_Svg = () => {
    
    const {problemName} = useContext(ProblemContext)
    const problemParser =  new ProblemParser()
    const niceProblemName = problemParser.getWikiName(problemName)
    
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
            <Typography variant="h4" component="h4" style={{ color: 'black',fontWeight:'normal', textAlign: 'center'}} >
                {niceProblemName} visualization unavailable
        </Typography>
        </Card>
            
    </Box>
    )
}

export default No_Viz_Svg;