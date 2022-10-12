
import SearchBarProblemType from '../components/widgets/SearchBars/testAutoProb'
import { useEffect, useState } from "react";
import * as d3 from 'd3'
export default function Test(props){
    // useEffect(() => {
    //     // pars eResponse()
    //     d3.selectAll('.node').on('click', function(){
    //       console.log(this.__data__)
    //       d3.select(this).style('fill', 'red')
    
    //     })
    //   }, [])

    return(

        <div>
         <SearchBarProblemType />
        </div>
    );
}