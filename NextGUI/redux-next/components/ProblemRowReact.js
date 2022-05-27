import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from './AccordionNestedTextBox'


function ProblemRowReact(props) { 
    const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
    const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }
    const CARD = { cardBodyText: "CARD BODY", cardHeaderText: "Card Header" }
    const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD}
    return (
        <AccordionNestedTextBox accordion={ACCORDION}></AccordionNestedTextBox>
        
    )


}

export default ProblemRowReact