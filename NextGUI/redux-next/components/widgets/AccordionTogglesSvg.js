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
  let isSwitch1Checked = false;
  let isSwitch2Checked = false;
  let isSwitch3Checked = false;

  function handleSwitch1Change(e) {
    isSwitch1Checked = e.target.checked;
    console.log("Switch 1 "+ isSwitch1Checked)
  }

  function handleSwitch2Change(e) {
    let isSwitch2Checked = e.target.checked;
  }

  function handleSwitch3Change(e) {
    let isSwitch2Checked = e.target.checked;
  }

  return (
    <div>
      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>
            {props.accordion.CARD.cardHeaderText}
            <Stack className="float-end" direction="horizontal" gap={3} >
              <FormControlLabel control={<Switch />} label={props.accordion.SWITCHES.switch1} onChange={handleSwitch1Change} />
              <FormControlLabel control={<Switch />} label={props.accordion.SWITCHES.switch2} onChange={handleSwitch2Change} />
              <FormControlLabel control={<Switch />} label={props.accordion.SWITCHES.switch3} onChange={handleSwitch3Change} />

              <ContextAwareToggle className="float-end" eventKey="0">▼</ContextAwareToggle>

            </Stack>

          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Stack direction="horizontal" gap={1}>
                {isSwitch1Checked  ? null : <Graphvisualization></Graphvisualization>}
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