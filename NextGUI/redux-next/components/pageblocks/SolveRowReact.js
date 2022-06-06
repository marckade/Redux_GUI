

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionSingleInputNestedButton from '../widgets/AccordionSingleInputNestedButton'


function SolveRowReact() { 
    const ACCORDION_FORM_ONE = { placeHolder: "Select Solver" }

    const BUTTON = { buttonText: "Solve" }
    const CARD = { cardBodyText: "Solution:", cardHeaderText: "Solver" }
    const TOOLTIP = { header: "HELLO I AM PROBLEM INFORMATION", formalDef: "DefaultDef", info: "info" }
    const ACCORDION = {ACCORDION_FORM_ONE,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionSingleInputNestedButton accordion={ACCORDION}></AccordionSingleInputNestedButton>
        
    )


}

export default SolveRowReact