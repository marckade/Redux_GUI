import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../widgets/AccordionNestedTextBox'


function ProblemRowReact() { 
    const reduxBaseUrl = 'http://redux.aws.cose.isu.edu:27000/'; //redux url. Note the trailing slash
    const fullUrl = reduxBaseUrl+ 'navigation/NPC_Problems'

    const ACCORDION_FORM_ONE = { placeHolder: "Select problem", url: fullUrl }
    const ACCORDION_FORM_TWO = { placeHolder: "default instance" }
    const CARD = { cardBodyText: "Instance", cardHeaderText: "Problem" }
    const TOOLTIP = { tooltipText: "HELLO I AM PROBLEM INFORMATION" }
    const INPUTURL = {url: fullUrl}

    const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD,TOOLTIP,INPUTURL}
    return (
        <AccordionNestedTextBox accordion={ACCORDION}></AccordionNestedTextBox>
        
    )


}

export default ProblemRowReact