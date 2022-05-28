

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionDualInputNestedButton from '../AccordionDualInputNestedButton'


function ProblemRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }

    const BUTTON = { buttonText: "Reduce" }
    const CARD = { cardBodyText: "Reduce To:", cardHeaderText: "Card Header" }
    const TOOLTIP = {tooltipText1: "HELLO I AM INFORMATION LEFT", tooltipText2: "Hello I AM INFORMATION RIGHT"}

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionDualInputNestedButton accordion={ACCORDION}></AccordionDualInputNestedButton>
        
    )


}

export default ProblemRowReact