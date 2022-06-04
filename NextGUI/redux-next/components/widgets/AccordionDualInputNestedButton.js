import React from 'react'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl, Col, Row, Container } from 'react-bootstrap'
import {Stack,Button} from '@mui/material'

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarChooseReduceProblem from './SearchBarChooseReduceProblem';
import SearchBarSelectReduction from './SearchBarSelectReduction';
import { ProblemContext } from '../contexts/ProblemProvider';
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
      className = "float-end"
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
  const {reduceRequest} = useContext(ProblemContext)
  return (
    <div>

      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>



            <Stack direction="horizontal" justifyContent="right" gap={2}>
              {props.accordion.CARD.cardHeaderText}
              <SearchBarChooseReduceProblem
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
              /> {/**Search bar left (form control 1) */}
              <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText1}></PopoverTooltipHover>

              <SearchBarSelectReduction
                placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder} />
              <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText2}></PopoverTooltipHover>
              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>

            </Stack>





          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>

              {props.accordion.CARD.cardBodyText}
              <div className="submitButton">
                <Button
                  style={{ backgroundColor: 'blue', WebkitTextFillColor: 'white' }}
                  onClick={reduceRequest}
                >{props.accordion.BUTTON.buttonText}</Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>

    </div>
      );
}

export default AccordionDualInputNestedButton