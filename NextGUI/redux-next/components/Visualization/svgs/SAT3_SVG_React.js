import React from 'react'
import { getSat3 } from './Sat3ToCliqueInstance'
import dynamic from "next/dynamic";

/// SAT3_SVG_React.js
/// This is a wrapper for the SAT3 visualization instance. It allows us to use the visualization as a react component, and also disables
/// server side rendering due to compilation issues with rendering a d3 svg before the entire page is rendered. 

function Sat3SvgReact(props) {
     console.log("RERENDER SVG_REACT",props.data)
    return (
        <>
        <div id={'problem'}>{getSat3('problem',props.data)}</div>
        </>
)     
}
export default dynamic(() => Promise.resolve(Sat3SvgReact), {
    ssr: false
  })