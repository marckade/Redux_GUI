
import React from 'react'
import { useContext, useState, useEffect } from 'react';
import SAT3_SVG_React from '../Visualization/svgs/SAT3_SVG_React';
import ReducedVisualizations from "../Visualization/ReducedVisualization";
import { getClique } from '../Visualization/svgs/Sat3ToCliqueReduction';
import { getSat3 } from '../Visualization/svgs/Sat3ToCliqueInstance'
import CLIQUE_SVG_REACT from '../Visualization/svgs/CLIQUE_SVG_REACT';
import { Container } from '@mui/material';
import TEST_SVG_REACT from '../Visualization/svgs/TEST_SVG_REACT';
import Split from 'react-split'
import { ProblemContext } from '../contexts/ProblemProvider';
import VisualizationLogic from './VisualizationLogic';


//const [initialLoad, setInitialLoad] = useState(false);



export default function VisualizationBox({reduceToggled,solveToggled,loading,problemVisualizationData,reducedVisualizationData,problemSolutionData,url}) {
    //console.log(reduceToggled,loading)
    const { problemName, problemInstance, chosenReductionType, reduceToInstance } = useContext(ProblemContext);


    // useEffect(() => {
    //     if(initialLoad){
    //       console.log("Got here visual")
    //     // setProblemVisualizationData("")
    //     // setReducedVisualizationData(null)
    //     // setProblemSolutionData(null)
    //   }
    
    //   }, [problemName])
    if (reduceToggled && !loading) {

        return (
            <>
                    {/* <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
                    <CLIQUE_SVG_REACT data={reducedVisualizationData}></CLIQUE_SVG_REACT> */}
                    {/* <TEST_SVG_REACT></TEST_SVG_REACT>
                    <TEST_SVG_REACT></TEST_SVG_REACT> */}
                    +
                <Split
                    class="wrap"      
                    direction="horizontal"
                    style={{ height: 'inherit' }}
                    
                >
                                <Container>
                                <SAT3_SVG_React 
                                    data={problemVisualizationData}
                                    solution={problemSolutionData}
                                    showSolution={solveToggled}
                                    url={url}
                                ></SAT3_SVG_React>
                                </Container>
                                <Container>
                                <CLIQUE_SVG_REACT data={reducedVisualizationData}></CLIQUE_SVG_REACT>
                                </Container>
                    </Split>
              
            </>
        )
    }
    else if (!reduceToggled && !loading) {
        return (
            <>
                
                <Container>
                <VisualizationLogic
                        problemName={problemName}
                        problemInstance={problemInstance}
                        reductionName={chosenReductionType}
                        problemSolutionData={problemSolutionData}
                        reducedVisualizationData={reducedVisualizationData}
                        problemVisualizationData={problemVisualizationData}
                        solverOn={solveToggled}
                        reductionOn={reduceToggled}
                        gadgetsOn={false}
                        url={url}

                    />
                     {/* <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React> */}
                    </Container>
                    
                </>)
    }
    return (<>
    {"LOADING"}
    </>
    )
}