

import React, { Component, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../widgets/AccordionTogglesSvg'
import { ProblemContext } from '../contexts/ProblemProvider'

const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
const CARD = { cardBodyText:"DEFAULT BODY", problemJson: 'DEFAULT' ,  problemInstance:'DEFAULT', cardHeaderText: "Visualize",problemText:"DEFAULT" }
const SWITCHES = { switch1: "Highlight solution", switch2: "Highlight gadgets", switch3: "Show reduction" }
const INPUTURL = { url: reduxBaseUrl }

    const ACCORDION = {CARD,SWITCHES,INPUTURL}

class VisualizeRowReact extends Component {

    static contextType = ProblemContext

    render() {
        return (
            <ProblemContext.Consumer>{(context) => {
                CARD.problemInstance = context.problemInstance;
                CARD.problemJson =  context.problemJson;

                return (
                    <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
                )
            }}
            </ProblemContext.Consumer>
        );
    }


}

export default VisualizeRowReact