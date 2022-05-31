

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../widgets/AccordionTogglesSvg'


function VisualizeRowReact() { 

    const CARD = { cardBodyText: "", cardHeaderText: "Visualize" }
    const SWITCHES = {switch1: "SWITCH 1",switch2: "SWITCH 2",switch3: "SWITCH 3"}

    const ACCORDION = { CARD,SWITCHES}
    return (
        <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
        
    )


}

export default VisualizeRowReact