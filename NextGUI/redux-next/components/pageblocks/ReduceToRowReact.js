
/**
 * ReduceToRowReact.js
 * This component passes down some styling information for popups and default text, and then passes it down to the
 * AccordionDualInputNestedButton component which deals with most of the actual logic of the Redux Reduction Row. 
 * @author Alex Diviney
 */

import React, { useContext,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'
import { ProblemContext } from '../contexts/ProblemProvider';

const ACCORDION_FORM_ONE = { placeHolder: "Select Problem To Reduce To", problemName:"ACCORDION FORM ONE PROBLEM NAME"}
const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

const BUTTON = { buttonText: "Reduce To" }
const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce To" }
const TOOLTIP1 = { header: "Reduce To Problem", formalDef: "Choose a problem to reduce your original problem to to see information about it", info: "" }
const TOOLTIP2 = { header: "Reduction Type", formalDef: "Choose a type of reduction to see information about it", info: "" }

const REDUCETO = { reduceTo: ["DEFAULTPROBLEM1", "DEFAULTPROBLEM2"] }

function ReduceToRowReact(props) { 
    const INPUTURL = { url: props.reduxBaseUrl }
    const THEME = {colors:{grey:"#424242",orange:"#d4441c"}}
    const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, BUTTON, TOOLTIP1,TOOLTIP2, REDUCETO, INPUTURL,THEME }

    return (
        
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}




export default ReduceToRowReact