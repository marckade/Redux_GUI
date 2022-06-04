

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionVerifier  from '../widgets/AccordionVerifier'


function VerifyRowReact() { 
    const ACCORDION_FORM_ONE = { placeHolder: "Select verifier" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }

    const BUTTON = { buttonText: "Verify" }
    const CARD = { cardBodyText: "Verified Solution:", cardHeaderText: "Verifier" }
    const TOOLTIP = {tooltipText1: "HELLO I AM VERIFIER INFO"}

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP}
    return (
        <AccordionVerifier accordion={ACCORDION}></AccordionVerifier>
        
    )


}

export default VerifyRowReact