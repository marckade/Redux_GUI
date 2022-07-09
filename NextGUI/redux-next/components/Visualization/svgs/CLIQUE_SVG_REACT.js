import React from 'react'
import { getClique } from './Sat3ToCliqueReduction'
import dynamic from "next/dynamic";

/// SAT3_SVG_React.js
/// This is a wrapper for the SAT3 visualization instance. It allows us to use the visualization as a react component, and also disables
/// server side rendering due to compilation issues with rendering a d3 svg before the entire page is rendered. 

function CLIQUE_SVG_React(props) {
     console.log("RERENDER CLIQUE SVG",props.data)
    return (
        <>
            <div id={'reduction'}>{getClique('reduction', props.data)}</div>
        </>
)     
}
export default dynamic(() => Promise.resolve(CLIQUE_SVG_React), {
    ssr: false
  })