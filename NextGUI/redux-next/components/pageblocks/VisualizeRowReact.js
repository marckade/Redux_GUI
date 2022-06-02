

import React, { Component, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../widgets/AccordionTogglesSvg'
import { ProblemContext } from '../contexts/ProblemProvider'


const CARD = { cardBodyText: "DEFAULT", problemInstance: 'DEFAULT', cardHeaderText: "Visualize" }
const SWITCHES = { switch1: "SWITCH 1", switch2: "SWITCH 2", switch3: "SWITCH 3" }
const ACCORDION = { CARD, SWITCHES }

class VisualizeRowReact extends Component {
    static contextType = ProblemContext

    render() {
        return (
            <ProblemContext.Consumer>{(context) => {
                console.log(context.problemInstance)
                CARD.cardBodyText = context.problemInstance;
                return (
                    <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
                )
            }}
            </ProblemContext.Consumer>
        );
    }


}

export default VisualizeRowReact