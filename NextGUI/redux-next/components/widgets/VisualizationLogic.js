// This is a holder for visualizations that passes down urls based on switch data.


import Split from 'react-split'
import { Container } from '@mui/material';
import { useState } from 'react';
import VertexCoverSvgReact from "../Visualization/svgs/VertexCover_SVG_React";
import SAT3_SVG_React from "../Visualization/svgs/SAT3_SVG_React";
import CLIQUE_SVG_REACT from "../Visualization/svgs/CLIQUE_SVG_REACT";
import CliqueSvgReactV2 from "../Visualization/svgs/Clique_SVG_REACT_V2";
import { tsvFormatValue } from 'd3';
import Refresh from '@mui/icons-material/Refresh';

export default function VisualizationLogic(props) {

    let apiCall = ""
    let visualization;
    let reducedVisualization;
    let problemName = props.problemName
    let reductionName = props.reductionName
    let reductionType = props.reductionType
    let reducedInstance = props.reducedInstance;
    let visualizationState = props.visualizationState
    let loading = props.loading
    let url = props.url;

    const handleBar = (sizes) => {
        //console.log(sizes);
    }

    //VertexCover 
    if (problemName === "VERTEXCOVER") {


        if (visualizationState.solverOn) {

        }
        else if (visualizationState.reductionOn) {

        }
        else if (visualizationState.gadgetsOn) {

        }
        else {
            apiCall = props.url +"VERTEXCOVERGeneric/visualize?problemInstance=" + props.problemInstance;
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            visualization = <VertexCoverSvgReact apiCall={apiCall} instance={props.problemInstance}></VertexCoverSvgReact>;

        }
    }


    //3SAT
    else if (problemName === "SAT3") {
        if (props.visualizationState.reductionOn) {
            if (reductionName === "CLIQUE" && !props.visualizationState.solverOn) {

                visualization =
                    <div>
                        {/* {"SOLVER OFF SPLIT VIZ SAT"} */}
                        <SAT3_SVG_React
                            data={props.problemVisualizationData}
                            solution={props.problemSolutionData}
                            showSolution={props.visualizationState.solverOn}
                            url={props.url}
                        ></SAT3_SVG_React>
                    </div>

                reducedVisualization =
                    <>
                        {/* {"SOLVER OFF SPLIT VIZ CLIQUE"} */}

                        <CLIQUE_SVG_REACT
                            data={props.reducedVisualizationData}
                            url={props.url}
                            reductionType={reductionType}
                            problemInstance={props.problemInstance}
                            solveSwitch={props.visualizationState.solverOn}>
                        </CLIQUE_SVG_REACT>
                    </>
            }
            else if (reductionName === "CLIQUE" && visualizationState.solverOn) {

                visualization =
                    <div>
                        {/* {"SOLVER ON SPLIT VIZ SAT"} */}
                        <SAT3_SVG_React
                            data={props.problemVisualizationData}
                            // solution={props.problemSolutionData}
                            showSolution={props.visualizationState.solverOn}
                            url={props.url}
                        ></SAT3_SVG_React>
                    </div>
                //Clique props: //props.url, props.reductionName, props.problemInstance, props.solveSwitch
                reducedVisualization =
                    <>
                        <div>
                            {/* {"SOLVER ON SPLIT VIZ CLIQUE"} */}
                        </div>
                        <CLIQUE_SVG_REACT
                            data={props.reducedVisualizationData}
                            url={props.url}
                            reductionType={reductionType}
                            //problemInstance={props.problemInstance}
                            solveSwitch={visualizationState.solverOn}
                        ></CLIQUE_SVG_REACT>
                    </>


            }

        }  else {

            visualization =
                <div>

                    {/* {"SOLVER: " + props.visualizationState.solverOn + " SAT NO SPLIT"} */}
                    <SAT3_SVG_React 
                        data={props.problemVisualizationData}
                        showSolution={props.visualizationState.solverOn}
                        url={props.url}
                    >
                    </SAT3_SVG_React>
                </div>
        }

        /*solverOn = "highlight solution"
        reductionOn = "Show Reduction"
        gadgetsOn = "Highlight gadgests"*/

        // Clique problem
    } else if (problemName === "CLIQUE") {
        // Solution is on
        if (visualizationState.solverOn) {
            let apiCall1 = props.url+"CLIQUEGeneric/solvedVisualization" // Solved base problem
            visualization =
                    <Container>
                        <CliqueSvgReactV2 
                            apiCall={apiCall1}
                            instance={props.problemInstance}
                            showSolution={props.visualizationState.solverOn}>
                        </CliqueSvgReactV2>
                    </Container>
                
            // Both reduction and solutions are on.
            if (visualizationState.reductionOn && reductionName === "VertexCover"){
                // Solved base problem
                visualization =
                <CliqueSvgReactV2 
                    apiCall={apiCall1}
                    instance={props.problemInstance}
                    showSolution={props.visualizationState.solverOn}>
                </CliqueSvgReactV2>

                //Unsolved reduction (Should be solved when we make a solution.)
                let apiCall2 = props.url+"VERTEXCOVERGeneric/visualize?problemInstance=" + props.reducedInstance;
                reducedVisualization =
                    <VertexCoverSvgReact 
                        apiCall={apiCall2} 
                        instance={props.reducedInstance}
                        solveSwitch={props.visualizationState.solverOn}>
                    </VertexCoverSvgReact>   
            }
        }

        // Reduction is on and the solution is OFF
        else if (visualizationState.reductionOn && !visualizationState.solverOn) {
            if (reductionName === "VertexCover") {
                let apiCall1 = props.url+"CLIQUEGeneric/visualize" // Unsolved base problem
                visualization =
                    <Container>
                        <CliqueSvgReactV2 
                            apiCall={apiCall1} 
                            instance={props.problemInstance}
                            showSolution={props.visualizationState.solverOn}> 
                        </CliqueSvgReactV2>
                    </Container>

                // Unsolved reduction
                let apiCall2 = props.url+"VERTEXCOVERGeneric/visualize?problemInstance=" + props.reducedInstance;
                reducedVisualization =
                        <Container>
                            <VertexCoverSvgReact 
                                apiCall={apiCall2} 
                                instance={props.reducedInstance}
                                solveSwitch={props.visualizationState.solverOn}>
                            </VertexCoverSvgReact>
                        </Container>
            }
        }
        
        else if (visualizationState.gadgetsOn) {}
        // Nothing is selected
        else {
            apiCall = props.url+"CLIQUEGeneric/visualize"
            visualization =
                <>
                    {/* {"CLIQUE V2 Viz"} */}
                    <CliqueSvgReactV2 
                        apiCall={apiCall} 
                        instance={props.problemInstance}> 
                    </CliqueSvgReactV2>
                </>
        }
    }



    // GUI

    if (!visualizationState.reductionOn && !loading) {
        // {console.log("reduction state: "+visualizationState.reductionOn)}
        return (
            <>
                <Container>
                    {visualization}
                </Container>
            </>
        )
    }
    else if (visualizationState.reductionOn && !loading) {
        // {console.log("reduction state: "+visualizationState.reductionOn)}



        return (
            <>
                <Split
                    class="wrap"
                    direction="horizontal"
                    style={{ height: 'inherit' }}
                    onDragStart={handleBar}
                >
                    <Container>
                        {/* {"Container1"} */}
                        {visualization}
                    </Container>

                    <Container>
                        {/* {"Container2"} */}
                        {reducedVisualization}
                    </Container>
                </Split>

            </>
        )
    }

    return (
        <>
        </>
    )
}