import React from 'react'
import { getClique } from './Sat3ToCliqueReduction'
import dynamic from "next/dynamic";
import { useRef,useState,useEffect } from 'react';

/// SAT3_SVG_React.js
/// This is a wrapper for the SAT3 visualization instance. It allows us to use the visualization as a react component, and also disables
/// server side rendering due to compilation issues with rendering a d3 svg before the entire page is rendered. 

function CliqueSvgReact(props) {
    const ref = useRef(null);
    useEffect(() => {
        getClique(ref.current, props.data);
    },[])
    return (
        <svg ref={ref}
            style={{
                height: "500px",
                width: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}/>
)     
}
export default dynamic(() => Promise.resolve(CliqueSvgReact), {
    ssr: false
  })