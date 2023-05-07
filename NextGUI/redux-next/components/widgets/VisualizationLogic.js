// This is a holder for visualizations that passes down urls based on switch data.


import Split from 'react-split'
import { Container } from '@mui/material';
import {No_Viz_Svg, No_Reduction_Viz_Svg} from '../Visualization/svgs/No_Viz_SVG';
import Visualizations from '../Visualization/svgs/Visualizations.js'
import defaultSolvers from '../Visualization/constants/DefaultSolvers';
import ReducedVisualizations from '../Visualization/svgs/ReducedVizualizations';

export default function VisualizationLogic(props) {

    const [solution, setSolution] = useState();
    const [mappedSolution, setMappedSolution] = useState();
    let visualization;
    let reducedVisualization;
    let problemName = props.problemName;
    let problemInstance = props.problemInstance;
    let reductionName = props.reductionName;
    let reductionType = props.reductionType;
    let reducedInstance = props.reducedInstance;
    let visualizationState = props.visualizationState
    let loading = props.loading
    let url = props.url;
    let solve = props.visualizationState.solverOn

    const handleBar = (sizes) => {}

    
    if(props.url && props.problemInstance){
        requestSolution(url,  defaultSolvers.get(problemName), problemInstance ).then(data => {
            setSolution(data) 
        }).catch((error) => console.log("SOLUTION REQUEST FAILED"))

        if(reductionType && reductionType.includes('-')){
            requestMappedSolutionTransitive(url, reductionType, problemInstance, solution).then(data => {
                setMappedSolution(data);
            }).catch((error) => console.log("MAPPED SOLUTION REQUEST FAILED"))
        }
        else{
            requestMappedSolution(url, reductionType, problemInstance, reducedInstance, solution).then(data => {
                setMappedSolution(data);
            }).catch((error) => console.log("SOLUTION MAPPING REQUEST FAILED"))
        }

        try{
            visualization = Visualizations.get(problemName)(solve, url, problemInstance, solution)
        } catch{
            visualization = <No_Viz_Svg></No_Viz_Svg>
        }

        if(props.visualizationState.reductionOn){
            try{
                reducedVisualization = ReducedVisualizations.get(reductionType)(solve, url, reducedInstance, mappedSolution)

                //NOTE - Caleb, The following is a temporary fix until CLIQUE_SVG_REACT.js is fixed, currently it takes the 3sat instance, 
                // but should take the clique instance, once that is fixed the following code block should be able to be removed without issue
                if(reductionName == "CLIQUE"){
                    reducedVisualization = ReducedVisualizations.get(reductionType)(solve, url, problemInstance, mappedSolution)
                }

            } catch{
                reducedVisualization = <No_Reduction_Viz_Svg></No_Reduction_Viz_Svg>
            }
        }
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