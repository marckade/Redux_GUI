import SAT3_SVG_React from "./SAT3_SVG_React";
import CliqueSvgReactV2 from "./Clique_SVG_REACT_V2";
import VertexCoverSvgReact from "./VertexCover_SVG_React";
import ArcSetSvgReact from "./ArcSet_SVG_React";
import CutSvgReact  from "./Cut_SVG_REACT";
import CliqueCoverSvgReact  from "./CliqueCover_SVG_REACT";
import GraphColoringSvgReact from "./GraphColoring_SVG_REACT";
import HamiltonianSvgReact from "./Hamiltonian_SVG_REACT";

const Visualizations = new Map([
    ["SAT3" , (solve, url, problemInstance, solution) => {
        return(
            <SAT3_SVG_React 
                solutionData={solution}
                data={problemInstance}
                showSolution={solve}
                url={url}
            ></SAT3_SVG_React>  
        )
    }],
    ["CLIQUE", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("ClIQUE", solve, url, problemInstance, solution)
        return(
        <CliqueSvgReactV2 
            apiCall={apiCall} 
        ></CliqueSvgReactV2>
        )
    }],
    ["VERTEXCOVER", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("VERTEXCOVER", solve, url, problemInstance, solution)
        return(
            <VertexCoverSvgReact 
                apiCall={apiCall}> 
            </VertexCoverSvgReact>
        )
    }],
    ["ARCSET", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("ARCSET", solve, url, problemInstance, solution)
        return(
            <ArcSetSvgReact 
                apiCall={apiCall} 
            ></ArcSetSvgReact>
        )
    }],
    ["CUT", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("CUT", solve, url, problemInstance, solution)
        return(
            <CutSvgReact 
                apiCall={apiCall} 
            ></CutSvgReact>
        )
    }],
    ["CLIQUECOVER", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("CLIQUECOVER", solve, url, problemInstance, solution)
        return(
            <CliqueCoverSvgReact 
                apiCall={apiCall} 
            ></CliqueCoverSvgReact>
        )
    }],
    ["GRAPHCOLORING", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("GRAPHCOLORING", solve, url, problemInstance, solution)
        return(
            <GraphColoringSvgReact 
                apiCall={apiCall} 
            ></GraphColoringSvgReact>
        )
    }],
    ["HAMILTONIAN", (solve, url, problemInstance, solution)=>{
        let apiCall = createAPICall("HAMILTONIAN", solve, url, problemInstance, solution)
        return(
            <HamiltonianSvgReact 
                apiCall={apiCall} 
            ></HamiltonianSvgReact>
        )
    }],
])

function createAPICall(problemName, solve, url, problemInstance, solution){
    if(solve){
        return url + problemName +"Generic/solvedVisualization?problemInstance="+ problemInstance+ "&solution=" + solution;
    }
    else{
        return url + problemName +"Generic/visualize?problemInstance="+ problemInstance; 
    }
}
export default Visualizations;