
import SAT3_SVG_React from '../Visualization/svgs/SAT3_SVG_React';
import ReducedVisualizations from "../Visualization/ReducedVisualization";
import { getClique } from '../Visualization/svgs/Sat3ToCliqueReduction';
import { getSat3 } from '../Visualization/svgs/Sat3ToCliqueInstance'
import CLIQUE_SVG_REACT from '../Visualization/svgs/CLIQUE_SVG_REACT';
import { Container } from '@mui/material';
import TEST_SVG_REACT from '../Visualization/svgs/TEST_SVG_REACT';
import Split from 'react-split'




export default function VisualizationBox({reduceToggled,loading,problemVisualizationData,reducedVisualizationData}) {
    //console.log(reduceToggled,loading)
    if (reduceToggled && !loading) {

        return (
            <>
                    {/* <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
                    <CLIQUE_SVG_REACT data={reducedVisualizationData}></CLIQUE_SVG_REACT> */}
                    {/* <TEST_SVG_REACT></TEST_SVG_REACT>
                    <TEST_SVG_REACT></TEST_SVG_REACT> */}
                    
                <Split
                    class="wrap"      
                    direction="horizontal"
                    style={{ height: 'inherit' }}
                    
                >
                                <Container>
                                <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
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
                        <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
                    </Container>
                    
                </>)
    }
    return (<>
    {"LOADING"}
    </>
    )
}