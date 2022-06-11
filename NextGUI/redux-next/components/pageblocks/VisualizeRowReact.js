
/**
 * VisualizeRow.js
 * This component passes down some styling information for popups and default text, and then passes it down to the
 * AccordiontoggleSvg component which deals with most of the actual logic of the Redux Visualization row. 
 * @author Alex Diviney
 */

import React, { Component, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../widgets/AccordionTogglesSvg'
import { ProblemContext } from '../contexts/ProblemProvider'

const CARD = { cardBodyText:"DEFAULT BODY", problemJson: 'DEFAULT' ,  problemInstance:'DEFAULT', cardHeaderText: "Visualize",problemText:"DEFAULT" }
const SWITCHES = { switch1: "Highlight solution", switch2: "Highlight gadgets", switch3: "Show reduction" }

function VisualizeRowReact(props) {
    const INPUTURL = { url: props.reduxBaseUrl }
    const ACCORDION = {CARD,SWITCHES,INPUTURL}

    return (
        <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
    )
}

export default VisualizeRowReact