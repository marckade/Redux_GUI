

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionSingleInputNestedButton from '../AccordionSingleInputNestedButton'


function SolveRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }

    const BUTTON = { buttonText: "Solve" }
    const CARD = { cardBodyText: "Solution:", cardHeaderText: "Solver" }
    const TOOLTIP = {tooltipText1: "HELLO I AM INFORMATION LEFT", tooltipText2: "Hello I AM INFORMATION RIGHT"}

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionSingleInputNestedButton accordion={ACCORDION}></AccordionSingleInputNestedButton>
        
    )


}

export default SolveRowReact