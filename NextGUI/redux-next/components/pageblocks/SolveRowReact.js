

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionSingleInputNestedButton from '../widgets/AccordionSingleInputNestedButton'


function SolveRowReact() { 
    const ACCORDION_FORM_ONE = { placeHolder: "Select Solver" }

    const BUTTON = { buttonText: "Solve" }
    const CARD = { cardBodyText: "Solution:", cardHeaderText: "Solver" }
    const TOOLTIP = {tooltipText1: "HELLO I AM SOLVER TOOLTIP", tooltipText2: "Hello I AM INFORMATION RIGHT"}
    const ACCORDION = {ACCORDION_FORM_ONE,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionSingleInputNestedButton accordion={ACCORDION}></AccordionSingleInputNestedButton>
        
    )


}

export default SolveRowReact