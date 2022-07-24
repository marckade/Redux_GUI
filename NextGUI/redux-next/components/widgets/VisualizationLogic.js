// This is a holder for visualizations that passes down urls based on switch data.

import VertexCoverSvgReact from "../Visualization/svgs/VertexCover_SVG_React";


export default function VisualizationLogic(props ) {
    const innerProps = props.props;
    let solverOn = innerProps.solverOn, reductionOn = innerProps.reductionOn, gadgetsOn = innerProps.gadgetsOn, problemName = innerProps.problemName, problemInstance = innerProps.problemInstance; 
    let apiCall = ""
    let jsxInline;
    if (problemName === "VERTEXCOVER") {
        
        if (solverOn) {
            
        }
        else if (reductionOn) {
            
        }
        else if (gadgetsOn) {
            
        }
        else {
            apiCall = "http://localhost:27000/VERTEXCOVERGeneric/visualize"
            let inlineProblemInstance = "{{a,b},{{a,b}},1}";
            jsxInline = <VertexCoverSvgReact apiCall={apiCall} instance={problemInstance}></VertexCoverSvgReact>;
        }
    }
    else if (problemName === "SAT3") {
        jsxInline = <>{ "SAT3 INSTANCE"}</>;
    }



    return (
        <div>
        {"JSX INLINE BELOW THIS LINE:"}
        {jsxInline}
        </div>
    )
}