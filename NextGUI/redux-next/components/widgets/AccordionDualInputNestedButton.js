import React from 'react'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion,Card,AccordionContext,Stack,FormControl,Button} from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarChooseReduceProblem from './SearchBarChooseReduceProblem';
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

function AccordionDualInputNestedButton(props) {
  //console.log(props.accordion.REDUCETO.reduceTo);
  return (
    <div>

<Accordion className = "accordion" defaultActiveKey="1">
      <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={1}>
              <div>
                {props.accordion.CARD.cardHeaderText}
              </div>
              <SearchBarChooseReduceProblem
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                reduceTo = {props.accordion.REDUCETO.reduceTo}
                problemName={props.accordion.ACCORDION_FORM_ONE.problemName} /> {/**Search bar left (form control 1) */}
                          <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText1}></PopoverTooltipHover>  

                          <FormControl placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder}></FormControl> {/**FORM CONTROL 2 (right)*/}
                          <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText2}></PopoverTooltipHover>  


            <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>
        </Stack>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
            <Card.Body>
            
                              {props.accordion.CARD.cardBodyText}
                            <div className="submitButton">
                              <Button>{props.accordion.BUTTON.buttonText}</Button>
                            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    
          </Accordion>
          
    </div>
      );
}

export default AccordionDualInputNestedButton