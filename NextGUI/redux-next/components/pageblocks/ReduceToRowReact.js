

import React, { useContext,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'
import { ProblemContext } from '../contexts/ProblemProvider';

const reduxBaseUrl = 'http://localhost:27000/'
const ACCORDION_FORM_ONE = { placeHolder: "Select Problem To Reduce To", problemName:"ACCORDION FORM ONE PROBLEM NAME"}
const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

const BUTTON = { buttonText: "Reduce To" }
const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce To" }
const TOOLTIP = { header: "HELLO I AM PROBLEM INFORMATION", formalDef: "DefaultDef", info: "info" }
const REDUCETO = {reduceTo:["DEFAULTPROBLEM1","DEFAULTPROBLEM2"]}
const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, BUTTON, TOOLTIP, REDUCETO }
function ReduceToRowReact() { 


    

    const { chosenReduceTo } = useContext(ProblemContext)
    console.log(chosenReduceTo)
    useEffect(() => {
     toolTipReq(chosenReduceTo)
    },[chosenReduceTo])
    
    return (
        
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}


function toolTipReq(reduceToName) {
    console.log(reduceToName);
    if (!(reduceToName===undefined)) {
        fetch(reduxBaseUrl + reduceToName.problemName+"Generic").then(resp => resp.json()).then(data => {
            TOOLTIP.info = data.problemDefinition;
            TOOLTIP.formalDef = data.formalDefinition
            TOOLTIP.header = reduceToName.problemName
        }).catch((error)=>{console.log("Failed to retrieve info, you likely entered a nonexistent problem name",error)}) 
    }
   
}

export default ReduceToRowReact