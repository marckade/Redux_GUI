import React from 'react'
import { getClique } from './Sat3ToCliqueReduction'
import dynamic from "next/dynamic";
import { useRef,useState,useEffect,useContext } from 'react';
import {ProblemContext} from '../../contexts/ProblemProvider'

/// SAT3_SVG_React.js
/// This is a wrapper for the SAT3 visualization instance. It allows us to use the visualization as a react component, and also disables
/// server side rendering due to compilation issues with rendering a d3 svg before the entire page is rendered. 
// Note that it also is taking in additional props like the url prop and sending a data request that it forwards to the child component
function CliqueSvgReact(props) { //props.url, props.reductionName, props.problemInstance, props.solveSwitch

    const defaultArr= [
        {
            "name": "x1",
            "cluster": "0",
            "solutionState":"True"
        },
        {
            "name": "!x2",
            "cluster": "0",
            "solutionState":"True"

        },
        {
            "name": "x3",
            "cluster": "0",
            "solutionState":"True"

        },
        {
            "name": "!x1",
            "cluster": "1",
            "solutionState":"True"

        },
        {
            "name": "x3_1",
            "cluster": "1",
            "solutionState":"True"

        },
        {
            "name": "x1_1",
            "cluster": "1",
            "solutionState":"True"

        },
        {
            "name": "x2",
            "cluster": "2",
            "solutionState":"True"

        },
        {
            "name": "!x3",
            "cluster": "2",
            "solutionState":"True"

        },
        {
            "name": "x1_2",
            "cluster": "2",
            "solutionState":""

        }
    ]
    let ref = useRef(null);
    // const { problemInstance } = useContext(ProblemContext)
    const [jsonData, setJsonData] = useState(defaultArr);
    useEffect(() => {
        if (props.solveSwitch) {
            //console.log("solved Visualization",props.solveSwitch);
            getReducedVisualizationData(props.url, props.reductionType, "solvedVisualization", props.problemInstance).then(data => {
                setJsonData(data)
            })
        }
        else if (!props.solveSwitch) {
            //console.log("solved Visualization", props.solveSwitch);
            getReducedVisualizationData(props.url, props.reductionType, "reduce", props.problemInstance).then(data => {
                setJsonData(data.reductionTo.clusterNodes)
            }).catch((error) => {
                console.log("CLIQUE_SVG_REACT solver switch off switch faled to fetch data")
            })
        }
        
    }, [props.problemInstance,props.solveSwitch])
    getClique(ref.current, jsonData);
    //console.log(jsonData);
    return (
        <svg ref={ref}
            style={{
                height: "100%",
                width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}/>
)     
}


function getReducedVisualizationData(url, reduction, suffix, instance) {

    if(reduction !== null || reduction !== ''){
      var fullUrl = `${url}${reduction}/${suffix}?problemInstance=${instance}`;
    console.log(fullUrl);
        return fetch(fullUrl).then(resp => {
            if (resp.ok) {
                return resp.json()
            }
        });

    }
    
  }




export default dynamic(() => Promise.resolve(CliqueSvgReact), {
    ssr: false
})