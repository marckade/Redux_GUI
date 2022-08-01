// This is a holder for visualizations that passes down urls based on switch data.


import Split from 'react-split'
import { Container } from '@mui/material';


import VertexCoverSvgReact from "../Visualization/svgs/VertexCover_SVG_React";
import SAT3_SVG_React from "../Visualization/svgs/SAT3_SVG_React";
import CLIQUE_SVG_REACT from "../Visualization/svgs/CLIQUE_SVG_REACT";
import CliqueSvgReactV2 from "../Visualization/svgs/Clique_SVG_REACT_V2";
import { tsvFormatValue } from 'd3';

export default function VisualizationLogic(props) {

    let apiCall = ""
    let visualization;
    let reducedVisualization;
    let problemName = props.problemName
    let reductionName = props.reductionName
    let visualizationState = props.visualizationState
    let loading = props.loading

    if (problemName === "VERTEXCOVER") {


        if (visualizationState.solverOn) {

        }
        else if (visualizationState.reductionOn) {

        }
        else if (visualizationState.gadgetsOn) {

        }
        else {
            apiCall = "http://localhost:27000/VERTEXCOVERGeneric/visualize"
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            visualization = <VertexCoverSvgReact apiCall={apiCall} instance={props.problemInstance}></VertexCoverSvgReact>;

        }
    }



    else if (problemName === "SAT3") {
        // visualization = <SAT3_SVG_React 
        //         data={props.problemVisualizationData}
        //         showSolution={props.solverOn}
        //         url={props.url}
        //     ></SAT3_SVG_React>;

        // if (visualizationState.solverOn) {

        // }
        //else
         
        if (visualizationState.reductionOn) {
            if (reductionName === "CLIQUE") {
            
                visualization = <SAT3_SVG_React 
                                                data={props.problemVisualizationData}
                                                solution={props.problemSolutionData}
                                                showSolution={props.visualizationState.solverOn}
                                                url={props.url}
                                            ></SAT3_SVG_React>
                reducedVisualization = <CLIQUE_SVG_REACT data={props.reducedVisualizationData}></CLIQUE_SVG_REACT>
            }


        }
        else if (visualizationState.gadgetsOn) {

        }
        else {
            visualization = <SAT3_SVG_React data={props.problemVisualizationData}
            showSolution={props.visualizationState.solverOn}
            url={props.url}
            ></SAT3_SVG_React>;
        }

        // Clique problem
    } else if (problemName === "CLIQUE") {

        if (visualizationState.solverOn) {

        }
        else if (visualizationState.reductionOn) {

            //Reductions 

            if (reductionName === "VERTEXCOVER") {
                reducedVisualization =  <VertexCoverSvgReact data={props.reducedVisualizationData}></VertexCoverSvgReact>
            }

        }
        else if (visualizationState.gadgetsOn) {

        }
        else {
            apiCall = "http://localhost:27000/CLIQUEGeneric/visualize"
            visualization = <CliqueSvgReactV2 apiCall={apiCall} instance={props.problemInstance}> </CliqueSvgReactV2>
        }
    }
























    
    // GUI

    if (!visualizationState.reductionOn && !loading) {
        {console.log("reduction state: "+visualizationState.reductionOn)}
        return (
            <>
            <Container>
                {visualization}
            </Container>
            </>
        )
    }
    else if(visualizationState.reductionOn && !loading){
        {console.log("reduction state: "+visualizationState.reductionOn)}
        return(
            <>
             <Split
                    class="wrap"      
                    direction="horizontal"
                    style={{ height: 'inherit' }}
                    
                >
                                <Container>
                                {visualization}
                                </Container>

                                <Container>
                                {reducedVisualization}
                                </Container>
                    </Split>
            
            </>
        )
    }

    return(
        <>
        </>
    )
}