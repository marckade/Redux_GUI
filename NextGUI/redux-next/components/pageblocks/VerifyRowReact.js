

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionVerifier  from '../widgets/AccordionVerifier'


function VerifyRowReact() { 
    const reduxBaseUrl = 'http://localhost:27000/'

    const ACCORDION_FORM_ONE = { placeHolder: "Select verifier" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }

    const BUTTON = { buttonText: "Verify" }
    const CARD = { cardBodyText: "Verified Solution:", cardHeaderText: "Verifier" }
    const INPUTURL = { url: reduxBaseUrl }
    const TOOLTIP = { header: "HELLO I AM PROBLEM INFORMATION", formalDef: "DefaultDef", info: "info" }

    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,BUTTON,TOOLTIP,INPUTURL}
    return (
        <AccordionVerifier accordion={ACCORDION}></AccordionVerifier>
        
    )


}

export default VerifyRowReact