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
import No_Viz_Svg from '../Visualization/svgs/No_Viz_SVG';

export default function VisualizationLogic(props) {

    const [solution, setSolution] = useState();
    const [mappedSolution, setMappedSolution] = useState();
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
    }

    //VertexCover 
    if (problemName === "VERTEXCOVER") {
        if(props.url && props.problemInstance){
            requestSolution(props.url,"VertexCoverBruteForce",props.problemInstance).then(data => {
                setSolution(data)
            }).catch((error) => console.log("SOLUTION REQUEST FAILED"))
        }

        if (visualizationState.solverOn) {

            apiCall = props.url + "VERTEXCOVERGeneric/solvedVisualization?problemInstance=" + props.problemInstance + "&solution=" + solution;
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            
            visualization = 
                <Container>
                    <VertexCoverSvgReact 
                        apiCall={apiCall} 
                        instance={props.reducedInstance}
                        solveSwitch={props.visualizationState.solverOn}>
                    </VertexCoverSvgReact>
                </Container>

            reducedVisualization = <No_Viz_Svg></No_Viz_Svg>

        if (visualizationState.reductionOn){
            reducedVisualization = <No_Viz_Svg></No_Viz_Svg>
        }
        }
        //No Arcset visualization implemented so no reduced visualizations possible.

        else if (!visualizationState.solverOn && visualizationState.reductionOn) {
            apiCall = props.url +"VERTEXCOVERGeneric/visualize?problemInstance=" + props.problemInstance;
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            visualization = 
                    <VertexCoverSvgReact apiCall={apiCall} instance={props.problemInstance}></VertexCoverSvgReact>
            
            reducedVisualization = <No_Viz_Svg></No_Viz_Svg>
        
        }

        else if (visualizationState.gadgetsOn) {

        }
            //Neither solver or reduction On
        else {
            apiCall = props.url +"VERTEXCOVERGeneric/visualize?problemInstance=" + props.problemInstance;
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            visualization = 
                    <VertexCoverSvgReact apiCall={apiCall} instance={props.problemInstance}></VertexCoverSvgReact>

        }

        
    }


    //3SAT
    else if (problemName === "SAT3") {
        if(props.url && props.problemInstance){
            requestSolution(props.url,"Sat3BacktrackingSolver",props.problemInstance).then(data => {
                setSolution(data) 
            }).catch((error) => console.log("SOLUTION REQUEST FAILED"))
        }
        if (props.visualizationState.reductionOn) {
            if(reductionName === "CLIQUE"){
                if(props.url && props.problemInstance && props.reducedInstance && solution){
                    requestMappedSolution(props.url, "SipserReduceToCliqueStandard", props.problemInstance, props.reducedInstance, solution).then(data => {
                        setMappedSolution(data);
                    }).catch((error) => console.log("SOLUTION MAPPING REQUEST FAILED"))
                }
                if (!props.visualizationState.solverOn) {

                    visualization =
                        <div>
                            {/* {"SOLVER OFF SPLIT VIZ SAT"} */}
                            <SAT3_SVG_React
                                solutionData={solution}
                                data={props.problemVisualizationData}
                                showSolution={props.visualizationState.solverOn}
                                url={props.url}
                            ></SAT3_SVG_React>
                        </div>

                    reducedVisualization =
                        <>
                            {/* {"SOLVER OFF SPLIT VIZ CLIQUE"} */}

                            <CLIQUE_SVG_REACT
                                solutionData={mappedSolution}
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
                                solutionData={solution}
                                data={props.problemVisualizationData}
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
                                solutionData={mappedSolution}
                                data={props.reducedVisualizationData}
                                url={props.url}
                                reductionType={reductionType}
                                problemInstance={props.problemInstance}
                                solveSwitch={visualizationState.solverOn}
                            ></CLIQUE_SVG_REACT>
                        </>


                } 
            }
            //Sat and vertex cover reduction
            else if (reductionName === "VERTEXCOVER"){
                requestMappedSolutionTransitive(props.url, "SipserReduceToCliqueStandard-sipserReduceToVC", props.problemInstance, solution).then(data => {
                    setMappedSolution(data);
                }).catch((error) => console.log("MAPPED SOLUTION REQUEST FAILED"))
                if(!props.visualizationState.solverOn) {

                    visualization =
                        <div>
                            {/* {"SOLVER OFF SPLIT VIZ SAT"} */}
                            <SAT3_SVG_React
                                solutionData={solution}
                                data={props.problemVisualizationData}
                                solution={solution}
                                showSolution={props.visualizationState.solverOn}
                                url={props.url}
                            ></SAT3_SVG_React>
                        </div>
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
                else if (props.visualizationState.solverOn) {
                    visualization =
                        <div>
                            {/* {"SOLVER ON SPLIT VIZ SAT"} */}
                            <SAT3_SVG_React
                                solutionData={solution}
                                data={props.problemVisualizationData}
                                // solution={props.problemSolutionData}
                                showSolution={props.visualizationState.solverOn}
                                url={props.url}
                            ></SAT3_SVG_React>
                        </div>
                    //Clique props: //props.url, props.reductionName, props.problemInstance, props.solveSwitch
                    let apiCall2 = props.url+"VERTEXCOVERGeneric/solvedVisualization?problemInstance=" + props.reducedInstance + "&solution=" + mappedSolution;
                    reducedVisualization =
                            <VertexCoverSvgReact 
                                apiCall={apiCall2} 
                                reduceFrom={problemName}
                                reduceFromInstance={props.problemInstance}
                                reduceFromData={props.problemVisualizationData}
                                instance={props.reducedInstance}
                                solveSwitch={props.visualizationState.solverOn}
                                url = {props.url}
                            >
                            </VertexCoverSvgReact>


                } 
            }

            //Reduction is on but nothing is implemented for it
            else {
                visualization =
                    <div>
                        {/* {"SOLVER ON SPLIT VIZ SAT"} */}
                        <SAT3_SVG_React
                            solutionData={solution}
                            data={props.problemVisualizationData}
                            // solution={props.problemSolutionData}
                            showSolution={props.visualizationState.solverOn}
                            url={props.url}
                        ></SAT3_SVG_React>
                    </div>
                
                reducedVisualization = <No_Viz_Svg></No_Viz_Svg>
                

            }

        }  else {

            visualization =
                <div>

                    {/* {"SOLVER: " + props.visualizationState.solverOn + " SAT NO SPLIT"} */}
                    <SAT3_SVG_React 
                        solutionData={solution}
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
        if(props.url && props.problemInstance){
            requestSolution(props.url, "CliqueBruteForce", props.problemInstance).then(data=>{
                setSolution(data);
            }).catch((error) => console.log("SOLUTION REQUEST FAILED"))
        }
        // Solution is on
        if (visualizationState.solverOn) {
            let apiCall1 = props.url+"CLIQUEGeneric/solvedVisualization?problemInstance=" + props.problemInstance + "&solution=" + solution; // Solved base problem
            visualization =
            <Container>
                <CliqueSvgReactV2 
                    apiCall={apiCall1}
                    instance={props.problemInstance}
                    showSolution={props.visualizationState.solverOn}>
                </CliqueSvgReactV2>
            </Container>
            
            // Both reduction and solutions are on.
            if(reductionName == "VERTEXCOVER"){
                if(props.url && props.problemInstance && props.reducedInstance && solution){
                    requestMappedSolution(props.url, "sipserReduceToVC", props.problemInstance, props.reducedInstance, solution).then(data => {
                        setMappedSolution(data);
                    }).catch((error) => console.log("MAPPED SOLUTION REQUEST FAILED"))
                }
                if (visualizationState.reductionOn ){
                    // Solved base problem
                    visualization =
                    <Container>
                    <CliqueSvgReactV2 
                        apiCall={apiCall1}
                        instance={props.problemInstance}
                        showSolution={props.visualizationState.solverOn}>
                    </CliqueSvgReactV2>
                    </Container>

                    //Unsolved reduction (Should be solved when we make a solution.)
                    let apiCall2 = props.url + "VERTEXCOVERGeneric/solvedVisualization?problemInstance=" + props.reducedInstance + "&solution=" + mappedSolution;
                    reducedVisualization =
                        
                        <VertexCoverSvgReact 
                            apiCall={apiCall2} 
                            instance={props.reducedInstance}
                            solveSwitch={props.visualizationState.solverOn}>
                        </VertexCoverSvgReact>   
                }
            }

            //reduction is on, solution is on, reduction is not Vertexcover so no visualization
            else if(visualization.reductionOn && reductionName !="VERTEXCOVER") {
                


                visualization =
                <CliqueSvgReactV2 
                    apiCall={apiCall1} 
                    instance={props.problemInstance}
                    showSolution={props.visualizationState.solverOn}> 
                </CliqueSvgReactV2>
                
                reducedVisualization = <No_Viz_Svg></No_Viz_Svg>

            }

        }

        // Reduction is on and the solution is OFF
        else if (visualizationState.reductionOn && !visualizationState.solverOn) {
            let apiCall1 = props.url + "CLIQUEGeneric/visualize?problemInstance=" + props.problemInstance; // Unsolved base problem

            if (reductionName === "VERTEXCOVER") {
                visualization =
                    <CliqueSvgReactV2
                        apiCall={apiCall1}
                        instance={props.problemInstance}
                        showSolution={props.visualizationState.solverOn}>
                    </CliqueSvgReactV2>

                // Unsolved reduction
                let apiCall2 = props.url + "VERTEXCOVERGeneric/visualize?problemInstance=" + props.reducedInstance;
                reducedVisualization =
                    <Container>
                        <VertexCoverSvgReact
                            apiCall={apiCall2}
                            instance={props.reducedInstance}
                            solveSwitch={props.visualizationState.solverOn}>
                        </VertexCoverSvgReact>
                    </Container>
            }
            
            //reduction is on, solver is off, not a vcover reduction then no viz found
            else {
                    visualization =
                        <CliqueSvgReactV2
                            apiCall={apiCall1}
                            instance={props.problemInstance}
                            showSolution={props.visualizationState.solverOn}>
                        </CliqueSvgReactV2>
                
                    reducedVisualization = <No_Viz_Svg></No_Viz_Svg>
                }
            
        }
        
        else if (visualizationState.gadgetsOn) {}
        // Nothing is selected
        else {
            apiCall = props.url+"CLIQUEGeneric/visualize?problemInstance=" + props.problemInstance;
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

        
        //Problem isnt 3SAT or Clique or VertexCover
    else {
        visualization = <No_Viz_Svg></No_Viz_Svg>
        reducedVisualization = <No_Viz_Svg></No_Viz_Svg>
    }


    if (!visualizationState.reductionOn && !loading) {
        return (
            <>
                <Container>
                    {visualization}
                </Container>
            </>
        )
    }
    else if (visualizationState.reductionOn && !loading) {



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

export function requestSolution(url, solver, problemFrom ) {
    let parsedInstance = problemFrom.replaceAll('&', '%26');
  
        return fetch(url + solver + '/solve?' + "problemInstance=" + parsedInstance).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        }).catch((error) => console.log(error)) 
}

export function requestMappedSolution(url, reduction, problemFrom, problemTo, solution ) {
    let parsedFrom = problemFrom.replaceAll('&', '%26');
    let parsedTo = problemTo.replaceAll('&', '%26');
    let fullUrl = url + reduction + '/mapSolution?' + "problemFrom=" + parsedFrom + "&problemTo=" + parsedTo + "&problemFromSolution=" + solution
    return fetch(fullUrl).then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    }).catch((error) => console.log(error))
}

export async function requestMappedSolutionTransitive(url, reduction, problemInstance, solution ) {
    let problemFrom = problemInstance;
    let mappedSolution = solution;
    let problemTo;
    let reductionList = reduction.split("-");
    for(let i=0; i<reductionList.length; i++){
        await requestReducedInstance(url, reductionList[i], problemFrom).then(data => {
            problemTo = data.reductionTo.instance;
        }).catch((error) => console.log("REDUCTION FOR SOLUTION MAPPING REQUEST FAILED"))
        await requestMappedSolution(url, reductionList[i], problemFrom, problemTo, mappedSolution).then(data => {
            mappedSolution = data;
        }).catch((error) => console.log("SOLUTION MAPPING REQUEST FAILED"))
        problemFrom = problemTo;
    }
    return mappedSolution;
}

export async function requestReducedInstance(url, reductionName, reduceFrom) {
    var parsedInstance = reduceFrom.replaceAll('&', '%26');
  
    return await fetch(url + reductionName + '/reduce?' + "problemInstance=" + parsedInstance).then(resp => {
      if (resp.ok) {
  
        return resp.json();
      }
    })
  }