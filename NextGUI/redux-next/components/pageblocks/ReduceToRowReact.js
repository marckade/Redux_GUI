

import React, { useContext,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'
import { ProblemContext } from '../contexts/ProblemProvider';

const reduxBaseUrl = 'http://localhost:27000/'
const ACCORDION_FORM_ONE = { placeHolder: "Select Problem To Reduce To", problemName:"ACCORDION FORM ONE PROBLEM NAME"}
const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

const BUTTON = { buttonText: "Reduce To" }
const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce To" }
const TOOLTIP1 = { header: "Reduce To Problem", formalDef: "Choose a problem to reduce your original problem to to see information about it", info: "" }
const TOOLTIP2 = { header: "Reduction Type", formalDef: "Choose a type of reduction to see information about it", info: "" }

const REDUCETO = { reduceTo: ["DEFAULTPROBLEM1", "DEFAULTPROBLEM2"] }
const INPUTURL = { url: reduxBaseUrl }
const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, BUTTON, TOOLTIP1,TOOLTIP2, REDUCETO, INPUTURL }

function ReduceToRowReact() { 
    
    return (
        
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}




export default ReduceToRowReact