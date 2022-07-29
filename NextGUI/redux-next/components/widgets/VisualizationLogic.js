// This is a holder for visualizations that passes down urls based on switch data.

import VertexCoverSvgReact from "../Visualization/svgs/VertexCover_SVG_React";
import SAT3_SVG_React from "../Visualization/svgs/SAT3_SVG_React";
import CLIQUE_SVG_REACT from "../Visualization/svgs/CLIQUE_SVG_REACT";
import CliqueSvgReactV2 from "../Visualization/svgs/Clique_SVG_REACT_V2";

export default function VisualizationLogic(props ) {
   // const innerProps = props.props;
    // let solverOn = innerProps.solverOn, reductionOn = innerProps.reductionOn, gadgetsOn = innerProps.gadgetsOn, problemName = innerProps.problemName, 
    // problemInstance = innerProps.problemInstance, problemVisualizationData = innerProps.problemVisualizationData, reducedVisualizationData = innerProps.reducedVisualizationData,
    // problemSolutionData = innerProps.problemSolutionData
    let apiCall = ""
    let visualization;
   let problemName = props.problemName
    if (problemName === "VERTEXCOVER") {

        apiCall = "http://localhost:27000/VERTEXCOVERGeneric/visualize?problemInstance=" + props.problemInstance;
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
         visualization = <VertexCoverSvgReact apiCall={apiCall} instance={props.problemInstance}></VertexCoverSvgReact>;
        
        // if (solverOn) {
            
        // }
        // else if (reductionOn) {
            
        // }
        // else if (gadgetsOn) {
            
        // }
        // else {
        //     apiCall = "http://localhost:27000/VERTEXCOVERGeneric/visualize"
        //     let inlineProblemInstance = "{{a,b},{{a,b}},1}";
        //     visualization = <VertexCoverSvgReact apiCall={apiCall} instance={problemInstance}></VertexCoverSvgReact>;
        // }
    }
    else if (problemName === "SAT3") {
        visualization = <SAT3_SVG_React 
                data={props.problemVisualizationData}
                showSolution={props.solverOn}
                url={props.url}
            ></SAT3_SVG_React>;

    } else if (problemName === "CLIQUE") {
        apiCall = "http://localhost:27000/CLIQUEGeneric/visualize"
         visualization =  <CliqueSvgReactV2 apiCall={apiCall} instance={props.problemInstance}> </CliqueSvgReactV2>
        
    }



    return (
        <div>.
        {visualization}
        </div>
    )
}