

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../widgets/AccordionDualInputNestedButton'


function ProblemRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "Select Problem" }
    const ACCORDION_FORM_TWO = { placeHolder: "Select Reduction" }

    const BUTTON = { buttonText: "Reduce To" }
    const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Reduce" }
    const TOOLTIP = {tooltipText1: "HELLO I AM INFORMATION LEFT", tooltipText2: "Hello I AM INFORMATION RIGHT"}

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}

export default ProblemRowReact