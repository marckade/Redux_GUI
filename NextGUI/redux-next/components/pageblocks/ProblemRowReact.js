import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../widgets/AccordionNestedTextBox'
import ProblemProvider, { ProblemContext } from '../contexts/ProblemProvider';
import { Component } from 'react';


const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
const fullUrl = reduxBaseUrl + 'navigation/NPC_Problems/'
const ACCORDION_FORM_ONE = { placeHolder: "Select problem", url: fullUrl }
const ACCORDION_FORM_TWO = { placeHolder: "default instance" }
const CARD = { cardBodyText: "Instance", cardHeaderText: "Problem" }
const TOOLTIP = { tooltipText: "HELLO I AM PROBLEM INFORMATION" }
const INPUTURL = { url: fullUrl }


const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, TOOLTIP, INPUTURL }

class ProblemRowReact extends Component { 

    static contextType = ProblemContext;
    
    render() {
        return (
            <ProblemContext.Consumer>{(context) => {
                //console.log(context)
                return (
                    <AccordionNestedTextBox accordion={ACCORDION}></AccordionNestedTextBox>
                )
            }}
            </ProblemContext.Consumer>
        );
    }

}

export default ProblemRowReact