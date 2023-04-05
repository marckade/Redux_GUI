
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography,Card } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ProblemContext } from '../../contexts/ProblemProvider';


export const No_Viz_Svg = () => {
    
    const {problemName, problemNameMap} = useContext(ProblemContext)
    const niceProblemName = problemNameMap.get(problemName)

    
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
                The {niceProblemName} visualization has not been implemented yet
        </Typography>
        </Card>
            
    </Box>
    )
}



export const No_Reduction_Viz_Svg = () => {
    
    const {chosenReductionType,reductionNameMap} = useContext(ProblemContext)
    const niceReductionName = reductionNameMap.get(chosenReductionType)
    
    return (
        
        <Box>    
            <Card variant="outlined"
                sx={{
                    bgcolor: 'primary.lGray',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300
                }}
            >
            <ErrorOutlineIcon fontSize="large"></ErrorOutlineIcon>
            <Typography 
                variant="h4" 
                component="h4" 
                style={{ 
                    color: 'black',
                    fontWeight:'normal',
                    textAlign: 'center'
                }} 
                >The {niceReductionName ?? "chosen reduction"} visualization has not been implemented yet</Typography>
        </Card>
    </Box>
    )
}


