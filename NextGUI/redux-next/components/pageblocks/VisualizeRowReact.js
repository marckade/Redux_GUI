

import React,{Component,useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionTogglesSvg from '../widgets/AccordionTogglesSvg'
import { ProblemContext } from '../contexts/ProblemProvider'


const CARD = { cardBodyText:"DEFAULT BODY", problemInstance:'DEFAULT', cardHeaderText: "Visualize",problemText:"DEFAULT" }
    const SWITCHES = {switch1: "SWITCH 1",switch2: "SWITCH 2",switch3: "SWITCH 3"}
    const ACCORDION = {CARD,SWITCHES}

class VisualizeRowReact extends Component { 
    static contextType = ProblemContext
    
    render() {
        return (
            <ProblemContext.Consumer>{(context) => {
                CARD.problemInstance = context.problemInstance;

                return (
                    <AccordionTogglesSvg accordion={ACCORDION}></AccordionTogglesSvg>
                    )
            }}
            </ProblemContext.Consumer>
        );
    }


}

export default VisualizeRowReact