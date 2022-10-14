
import NavGraph, {nodesList, edgeList} from '../components/widgets/SearchBars/testAutoProb'
import { useEffect, useState } from "react";
//import * as d3 from 'd3'





export default function Test(props){
    useEffect(() => {
        
        setTimeout(() => {

          for(let elem of nodesList){
            // console.log(elem)
            let node = document.getElementById(elem)
            const ellipseArray =  node.getElementsByTagName('ellipse');
            node.addEventListener('mouseover', function(){
              ellipseArray[0].setAttribute("fill", "#f69240")
            })
  
            node.addEventListener('mouseout', function(){
              ellipseArray[0].setAttribute("fill", "none")
            })
  
            node.addEventListener('click', function(){
              //ellipseArray[0].setAttribute("fill", "none")
            })
          }

          for(let elem of edgeList){
            let edge = document.getElementById(elem)
           // const polygonArray =  edge.getElementsByTagName('polygon');
          //   edge.addEventListener('mouseover', function(){
          //   polygonArray[0].setAttribute("fill", "#f69240")
          //   })

          }

          // console.log(ellipseArray[0])
      
          // console.log('Hello, World!')
        }, 3500);
      }, [])

    return(

        <div>
         <NavGraph />
       
        </div>
    );
}