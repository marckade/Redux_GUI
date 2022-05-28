

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../AccordionTogglesSvg'


function VisualizeRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }
    const CARD = { cardBodyText: "CARD BODY", cardHeaderText: "Card Header" }
    const SWITCHES = {switch1: "SWITCH 1",switch2: "SWITCH 2",switch3: "SWITCH 3"}

    const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD,SWITCHES}
    return (
        <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
        
    )


}

export default VisualizeRowReact