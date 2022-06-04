import React from 'react'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, Stack, FormControl, Button } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
// import FormControl from '../components/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import FormControl from '../components/FormControl'
// import Page from "../components/widgets/graph";
import Graphvisualization from "../Visualization/Graphvisualization.js";


function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      <Button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'blue' }}
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    </>
  );
}

function AccordionTogglesSvg(props) {
  //console.log(props)

  return (
    <div>
      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>
            {props.accordion.CARD.cardHeaderText}
            <Stack className="float-end" direction="horizontal" gap={3} >
              <FormControlLabel control={<Switch disabled />} label={props.accordion.SWITCHES.switch1} />
              <FormControlLabel control={<Switch defaultChecked />} label={props.accordion.SWITCHES.switch2} />
              <FormControlLabel control={<Switch defaultChecked />} label={props.accordion.SWITCHES.switch3} />

              <ContextAwareToggle className="float-end" eventKey="0">▼</ContextAwareToggle>

            </Stack>

          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Stack direction="horizontal" gap={1}>

                <Graphvisualization problem={props.accordion.CARD.problemJson} instance={props.accordion.CARD.problemInstance}>

                </Graphvisualization>

                {/* {props.accordion.CARD.problemInstance} */}
              </Stack>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div>
  );
}

export default AccordionTogglesSvg