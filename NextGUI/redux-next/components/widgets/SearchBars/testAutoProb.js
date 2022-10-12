import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";
import dynamic from "next/dynamic";
import * as d3 from 'd3'
import { ProblemParser } from '../../../Tools/ProblemParser';
const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });
const tempGraph = {
  "arcset": {},
  "clique": {
    "vertexcover": [
      "sipserReduceToVC.cs"
    ]
  },
  "dm3": {},
  "exactcover": {},
  "graphcoloring": {
    "sat": [
      "KarpReduceSAT.cs"
    ]
  },
  "intprogramming01": {},
  "knapsack": {},
  "sat": {},
  "sat3": {
    "clique": [
      "SipserReduceToCliqueStandard.cs"
    ],
    "dm3": [
      "GareyJohnson.cs"
    ],
    "graphcoloring": [
      "KarpReduceGRAPHCOLORING.cs"
    ],
    "intprogramming01": [
      "KarpIntProgStandard.cs"
    ]
  },
  "subsetsum": {
    "knapsack": [
      "Feng.cs"
    ]
  },
  "tsp": {},
  "vertexcover": {
    "arcset": [
      "LawlerKarp.cs"
    ]
  }
}
const tempUrl  = 'http://localhost:27000/Navigation/NPC_NavGraph/info';
let nodes = []
let edges = []

export default function TestAuto(props) {
 // const problemParser = new ProblemParser()

  const [dot, setDotString] = useState('');
  const [graphObject, setObject] = useState(null);


  

  useEffect(() => {
    parseResponse()
  
  }, [])

  async function parseResponse(){
 
    // const responseObject = await getRequest(tempUrl);
    const responseObject  = tempGraph
    setObject(responseObject)
    const nodes = Object.keys(responseObject);
    let graph = "digraph NPProblems { \n"
    for (const node of nodes){
     
      graph += `${node}[id=${node}] \n`
      nodes.push(node)
    
      if(responseObject[node]){
        const nodeTo = Object.keys(responseObject[node])
        for( const elem of nodeTo) { 
          // pick the first reduction method
          const array = responseObject[node][elem][0].split('.')
          graph += `${node} -> ${elem}[label=${array[0]}] \n`
        }
      }
    
    }
  
    graph += '}'
    console.log(graph)

    setDotString(graph)
   
  }
  
  
  async function getRequest(url) {
    const promise = await fetch(url)
    const data = await promise.json() 
    return data
  }
  
  


  return (

  <>
   <Graphviz dot={dot}  />
  </>
  )

}

