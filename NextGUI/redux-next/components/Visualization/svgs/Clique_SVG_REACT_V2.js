//This is a react compatible vertexcover visualization built in d3.


import * as d3 from "d3";
import { text } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

function ForceGraph({ w, h, charge,apiCall,problemInstance }) {
    const [animatedNodes, setAnimatedNodes] = useState([]);
    const [animatedLinks, setAnimatedLinks] = useState([]);
    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
    
    const ref = useRef(null);
    // re-create animation every time nodes change
  
    useEffect(() => {
       // set the dimensions and margins of the graph

// append the svg object to the body of the page
const svg = d3.select(ref.current)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      `translate(${margin.left}, ${margin.top})`);
      const problemUrl = apiCall + '?problemInstance=' + problemInstance;
d3.json(problemUrl).then( function( data) {
  console.log(data);
  console.log(problemUrl)
// Initialize the links
const link = svg
  .selectAll("line")
  .data(data.links)
  .join("line")
    .style("stroke", "#aaa")



// Initialize the nodes
    
const node = svg
  .selectAll("circle")
  .data(data.nodes)
    .join("circle")
    // .attr("class", function (d) { return d.cover; })
    .attr("r", 20)
  .style("fill", function (d) {
      return "#FFC300";
      //"#00e676"
        // if (d.cover === "true") {
        //         return "#00e676"
        // }
        // else {
        //     return "#ff1744"
        // }
    })
    // .on("mouseover", function (d) {
    //     //console.log("HOVERING OVER A NODE", d.target.__data__.name)
    //     svg.selectAll(`.${d.target.__data__.cover}`).style('fill', "#abc")
    // })
    // .on("mouseout", function (d) {
    //     if (d.target.__data__.cover === "true") {
    //         svg.selectAll(`.${d.target.__data__.cover}`).style('fill', "#ffea00")
    //     }
    //     else {
    //         svg.selectAll(`.${d.target.__data__.cover}`).style('fill', "#ff1744")

    //     }
    // })
 
    
const text = svg.selectAll("text") //Append Text on top of nodes.
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .text(function(d) { return d["name"]; });

// Let's list the force we wanna apply on the network
const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()                               // This force provides links between nodes
          .id(function(d) { return d.name; })                     // This provide  the id of a node
          .links(data.links)                                    // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(charge))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
    .on("tick", ticked);



    
// This function is run at each iteration of the force algorithm, updating the nodes position.
function ticked() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("searchId", function (d) { return d.name; });
    
    text
    .text(function(d) {
        //console.log(d.name);
        return d.name;
    })
    .attr('x', function(d) {
        return d.x;
    })
    .attr('y', function(d) {
        return d.y
    })
    .attr('dy', function(d) {
        return 5
    })
}
    
});
 
      }, [])
      return (
          <svg 
              width={width}
              height={height}
            ref={ref}
        />
      )
}


export default function CliqueSvgReactV2(props) {
  const [charge, setCharge] = useState(-400);
  
  // create nodes with unique ids
  // radius: 5px
  const nodes = [
    {"id": "Alice"},
    {"id": "Bob"},
    {"id": "Carol"}
  ];
  
  const links = [
    {"source": "Alice", "target": "Bob"},
    {"source": "Bob", "target": "Carol"}
  ];
  return (
    <div className="visualization">
   
      {/* <input
        type="range"
        min="-500"
        max= "500"
        step="1"
        value={charge}
        onChange={(e) => setCharge(e.target.value)}
      /> */}
     <ForceGraph w={500} h={500} charge={charge} apiCall={props.apiCall} problemInstance ={props.instance} />
    </div>
  );
}

