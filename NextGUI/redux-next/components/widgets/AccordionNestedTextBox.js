import React from 'react'
import { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, Stack, FormControl, Button } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBar from './SearchBar';
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
      className="toggleButton"
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
  return (
    <div>

      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={1}>

              {props.accordion.CARD.cardHeaderText}

              <Stack direction="vertical">
                {/* <FormControl placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}>
                </FormControl> *FORM CONTROL 1 (header) */}
                <SearchBar placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder} url={props.accordion.INPUTURL.url}></SearchBar>
              </Stack>

              <PopoverTooltipHover popupText={props.accordion.TOOLTIP.tooltipText}></PopoverTooltipHover>



              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>
            </Stack>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Stack direction="horizontal" gap={1}>
                {props.accordion.CARD.cardBodyText}
                <FormControl placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder}></FormControl> {/**FORM CONTROL 2 (dropdown) */}
              </Stack>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>

    </div>
  );
}

export default AccordionNestedTextBox