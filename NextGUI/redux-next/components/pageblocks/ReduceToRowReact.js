

import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'
import { ProblemContext } from '../contexts/ProblemProvider';


function ReduceToRowReact(props) { 
    const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
    const fullUrl = reduxBaseUrl + 'navigation/Problem_ReductionsRefactor/' // API call to get problem list with no NPC prefix.
    const ACCORDION_FORM_ONE = { placeHolder: "Select Problem To Reduce To", problemName:"ACCORDION FORM ONE PROBLEM NAME"}
    const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

    const BUTTON = { buttonText: "Reduce To" }
    const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce To" }
    const TOOLTIP = { tooltipText1: "HELLO I AM INFORMATION LEFT", tooltipText2: "Hello I AM INFORMATION RIGHT" }
    const REDUCETO = {reduceTo:["DEFAULTPROBLEM1","DEFAULTPROBLEM2"]}

    const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, BUTTON, TOOLTIP, REDUCETO }
    
    return (
        
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}

export default ReduceToRowReact