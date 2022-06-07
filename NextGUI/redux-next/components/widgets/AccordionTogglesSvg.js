import React from 'react'
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, Stack } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
// import FormControl from '../components/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Switch } from '@mui/material'
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
  var visualization;
  let isSwitch1Checked;
  let isSwitch2Checked = false;
  let isSwitch3Checked = false;

  function handleSwitch1Change(e) {
    isSwitch1Checked = e.target.checked;
    if (isSwitch1Checked) {
      visualization = <Graphvisualization />;
      console.log("Switch 1 " + isSwitch1Checked);

    }

  }

  function handleSwitch2Change(e) {
    isSwitch2Checked = e.target.checked;
  }

  function handleSwitch3Change(e) {
    isSwitch3Checked = e.target.checked;
    if (isSwitch3Checked) {
      document.querySelector("#instanceDiv svg").setAttribute("style","border-right: 1px solid;");

      visualization = <div>
        <Graphvisualization />
        <Graphvisualization />

      </div>;
      console.log("Switch 3 " + isSwitch3Checked);

    }
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
              {/* <Stack direction="horizontal" gap={1}> */}
        
                {/* {isSwitch1Checked ? <Graphvisualization/> : null} */}


      
                <div id="instanceDiv" >
                <Graphvisualization id='Test' visualization="Daniel"></Graphvisualization>

                </div>

          
                <div id="reduceInstanceDiv">
                <Graphvisualization id='' ></Graphvisualization>
                </div>

             
              {/* </Stack> */}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div>
  );
}

export default AccordionTogglesSvg