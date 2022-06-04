import React from 'react'
import { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion,Card,AccordionContext,Stack,FormControl,Button} from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarProblemType from './SearchBarProblemType';
import { ProblemContext } from '../contexts/ProblemProvider'
// import FormControl from '../components/FormControl'


function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      className = "toggleButton"
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'blue' }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}



function AccordionNestedTextBox(props) {
  //console.log(props)
  const { problem, setProblemName, setProblemInstance, makeApiCall } = useContext(ProblemContext)
  const handleChangeInstance = (event) => {
   // console.log(event.target.value);
    setProblemInstance(event.target.value)
  }
  const handleChangeSearchSelection = (event) => {
   // console.log(event.target.value);
    setProblemName(event.target.value)
  }
  return (
    <div>

<Accordion className = "accordion" defaultActiveKey="1">
      <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={1}>
              
                {props.accordion.CARD.cardHeaderText}
               
              <Stack direction = "vertical">        
                {/* <FormControl placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}>
                </FormControl> *FORM CONTROL 1 (header) */}
                <SearchBarProblemType onChange={handleChangeSearchSelection} placeholder = {props.accordion.ACCORDION_FORM_ONE.placeHolder} url = {props.accordion.INPUTURL.url}></SearchBarProblemType>
              </Stack>

              <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText}></PopoverTooltipHover>  
                 
           
                        
            <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>
        </Stack>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Stack direction="horizontal" gap={1}>
              {props.accordion.CARD.cardBodyText}
                <FormControl as= "textarea" value={props.accordion.CARD.problemInstance} onChange={handleChangeInstance} ></FormControl> {/**FORM CONTROL 2 (dropdown) */}
            </Stack>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    
          </Accordion>
          
    </div>
      );
}

export default AccordionNestedTextBox