import React from 'react'
import { fullClear, getSat3, showSolution} from './Sat3ToCliqueInstance'
import dynamic from "next/dynamic";
import { useRef,useState,useEffect,useContext } from 'react';
import {ProblemContext} from '../../contexts/ProblemProvider'
/// SAT3_SVG_React.js
/// This is a wrapper for the SAT3 visualization instance. It allows us to use the visualization as a react component, and also disables
/// server side rendering due to compilation issues with rendering a d3 svg before the entire page is rendered. 
function getProblemSolutionData(url, solver, instance) {
    var fullUrl = `${url}${solver}/solve?solveInstance=${instance}`;
    return fetch(fullUrl).then(resp => {
      if (resp.ok) {
        console.log(resp.json());
        return resp.json()
      }
    });
}

function Sat3SvgReact(props) {
    const ref = useRef(null);
    const {problemInstance} = useContext(ProblemContext);
    const defaultSolution = ["x1","x3"];
    const [solutionData, setSolutionData] = useState();
    useEffect(() => {
        getSat3(ref.current, props.data);
        if(props.showSolution){
            console.log("Show Solution !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // let solutionData = getProblemSolution(props.url, "SkeletonSolver", problemInstance.replaceAll('&', "%26"));
            let apiCompatibleInstance = problemInstance.replaceAll('&', "%26");
            getProblemSolutionData(props.url, "SkeletonSolver", apiCompatibleInstance).then(data => {
                console.log(data);
                setSolutionData(data);
              }).catch((error)=>{console.log(error)});
            console.log(solutionData);
            console.log(solutionData);
            showSolution(defaultSolution);
        } else fullClear();

    },[problemInstance,props.showSolution])
    return (
        <svg ref={ref}
            style={{
                height: "700px",
                width:"100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}/>
)     
}
export default dynamic(() => Promise.resolve(Sat3SvgReact), {
    ssr: false
  })