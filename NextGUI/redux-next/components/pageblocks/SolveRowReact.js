

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionSingleInputNestedButton from '../widgets/AccordionSingleInputNestedButton'


function SolveRowReact() { 
    const reduxBaseUrl = 'http://localhost:27000/'
    const ACCORDION_FORM_ONE = { placeHolder: "Select Solver" }

    const BUTTON = { buttonText: "Solve" }
    const CARD = { cardBodyText: "Solution:", cardHeaderText: "Solver" }
    const TOOLTIP = { header: "Solver Information", formalDef: "Choose a type of solver to see information about it", info: "" }
    const INPUTURL = { url: reduxBaseUrl }

    const ACCORDION = {ACCORDION_FORM_ONE,CARD,BUTTON,TOOLTIP,INPUTURL}
    return (
        <AccordionSingleInputNestedButton accordion={ACCORDION}></AccordionSingleInputNestedButton>
        
    )


}

export default SolveRowReact