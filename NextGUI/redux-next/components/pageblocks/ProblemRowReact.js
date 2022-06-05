import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../widgets/AccordionNestedTextBox'
import ProblemProvider, { ProblemContext } from '../contexts/ProblemProvider';
import { Component } from 'react';


const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
const fullUrl = reduxBaseUrl + 'navigation/NPC_ProblemsRefactor/' // API call to get problem list with no NPC prefix.
const ACCORDION_FORM_ONE = { placeHolder: "Select problem" }
const ACCORDION_FORM_TWO = { placeHolder: "default instance" }
var CARD = { cardBodyText: "Instance", cardHeaderText: "Problem",problemInstance:"Default problem" }
const TOOLTIP = { tooltipText: "HELLO I AM PROBLEM INFORMATION" }
const INPUTURL = { url: fullUrl }


const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, TOOLTIP, INPUTURL }



function ProblemRowReact() {
    return (
        <>
        <AccordionNestedTextBox accordion={ACCORDION}></AccordionNestedTextBox>
        </>
    )
}

export default ProblemRowReact