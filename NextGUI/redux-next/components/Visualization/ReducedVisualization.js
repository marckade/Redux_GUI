import Split from "react-split";



export default function visualize(props){


    return(
        <Split className="wrap" direction="horizontal" style={{height: '500px'}}>
            
            {/* <div className="visualization" id="instanceDiv" >
                {props.instanceVisualization}

            </div> */}
            {props.instanceVisualization !== null ? <div className="visualization" id="instanceDiv" >
                {props.instanceVisualization}

            </div> : null}

            {/* <div className="visualization"  id="reducedDiv">
            {props.instanceVisualization}
                
            </div> */}

            {props.reducedVisualization !== null ? <div className="visualization" id="reducedDiv" >
                {props.reducedVisualization}

            </div> : null}

        </Split>
    )
}