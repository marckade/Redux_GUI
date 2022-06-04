

import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'
import { ProblemContext } from '../contexts/ProblemProvider';


function ReduceToRowReact() { 
 
    const ACCORDION_FORM_ONE = { placeHolder: "Select Problem To Reduce To", problemName:"ACCORDION FORM ONE PROBLEM NAME"}
    const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

    const BUTTON = { buttonText: "Reduce To" }
    const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce To" }
    const TOOLTIP = { tooltipText1: "Choose a problem to see information about it", tooltipText2: "Choose a reduction to see information about it" }
    const REDUCETO = {reduceTo:["DEFAULTPROBLEM1","DEFAULTPROBLEM2"]}

    const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, BUTTON, TOOLTIP, REDUCETO }
    
    return (
        
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}

export default ReduceToRowReact