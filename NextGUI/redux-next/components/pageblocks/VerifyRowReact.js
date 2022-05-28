

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionSingleInputNestedButton from '../AccordionSingleInputNestedButton'


function VerifyRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }

    const BUTTON = { buttonText: "Verify" }
    const CARD = { cardBodyText: "Verified Solution:", cardHeaderText: "Verifier" }
    const TOOLTIP = {tooltipText1: "HELLO I AM INFORMATION LEFT"}

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionSingleInputNestedButton accordion={ACCORDION}></AccordionSingleInputNestedButton>
        
    )


}

export default VerifyRowReact