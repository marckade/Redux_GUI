/**
 * AccordionTogglesSvg.js
 * 
 * This component does the real grunt work of the VerifyRowReact component. It uses passed in props to style and provide default text for its objects,
 * uses many of the global state values and has a variety of listeners and API calls.
 * 
 * The actual visualization logic is handled by imported Visualization components.
 * 
 * Essentialy, this is the brains of the VisualizeRowReact.js component and deals with the GUI's Visualize "Row"
 * 
 * @author Alex Diviney, Daniel Igbokwe
 */


import React from 'react'
import { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, Stack } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
// import FormControl from '../components/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Switch } from '@mui/material'
// import FormControl from '../components/FormControl'
// import Page from "../components/widgets/graph";
import Graphvisualization from "../Visualization/Graphvisualization";
import ReducedVisualizations from "../Visualization/ReducedVisualization";
import { ProblemContext } from '../contexts/ProblemProvider';




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



  const graphDotTest = `graph GRAPHCOLORING {  
    node [style="filled"];  
    a--b; 
    b--c; 
    c--a; 
    d--a; 
    d--e; 
    e--a; 
    f--a; 
    f--g; 
    a--g; 
    h--a; 
    h--i; 
    a--i; 
    a[fillcolor = Green] 
    b[fillcolor = White] 
    c[fillcolor = White] 
    d[fillcolor = White] 
    e[fillcolor = White] 
    f[fillcolor = White] 
    g[fillcolor = White] 
    h[fillcolor = White] 
    i[fillcolor = White] 
     }`;

  const graphDotTest2 = `graph GRAPHCOLORING {  
    node [style="filled"];  
    a--b; 
    b--c; 
    c--a; 
    d--a; 
    d--e; 
    e--a; 
    f--a; 
    f--g; 
    a--g; 
    h--a; 
    h--i; 
    a--i; 
    a[fillcolor = White] 
    b[fillcolor = White] 
    c[fillcolor = White] 
    d[fillcolor = White] 
    e[fillcolor = White] 
    f[fillcolor = White] 
    g[fillcolor = White] 
    h[fillcolor = White] 
    i[fillcolor = White] 
     }`;


  const { problemName, problemInstance } = useContext(ProblemContext);
  const [instance, setInstance] = useState(graphDotTest2);
  const [reduction, setReductionInstance] = useState(graphDotTest2);
  const [showSolution, setShowSolution] = useState(false);
  const [showGadgets, setShowGadgets] = useState(false);
  const [showReduction, setShowReduction] = useState(false);


  function handleSwitch1Change(e) {

    // change state of Switch 
    setShowSolution(e.target.checked)
    if (showSolution) {
      //setDotInstance(graphDotTest2);
      requestDotInstance(props.accordion.INPUTURL.url, problemName, problemInstance).then(data => {
        console.log(data);
        return data;
      })
        .then(data => {
          var parsedInstance = data.replaceAll('"', '');
          parsedInstance = parsedInstance.replaceAll('\\u003E', '>');
          setInstance(parsedInstance)
        }).catch((error) => console.log(error));
    }
    else {
      setInstance(graphDotTest);
    }
  }

  function handleSwitch2Change(e) {
    setShowGadgets(e.target.checked);
    console.log("Switch 2 Gadgets  " + e.target.checked);
  }

  function handleSwitch3Change(e) {
    setShowReduction(e.target.checked);
    console.log("Switch 3 Reduction  " + e.target.checked);
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


               {/* Single Visualization works below*/}

              {showSolution && showGadgets === false && showReduction === false ? <Stack className="justify-content-center" direction="horizontal" gap={2}>

                <Graphvisualization dot={graphDotTest} />

              </Stack> : null}

              {/* Reduction SVg works below*/}
              {showReduction ? <ReducedVisualizations instanceVisualization={<Graphvisualization dot={graphDotTest} />}
                reducedVisualization={<Graphvisualization dot={graphDotTest2} />}></ReducedVisualizations> : null}

            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div>
  );
}

async function requestDotInstance(url, name, instance) {
  var parsedInstance = instance.replaceAll('&', '%26');


  const fullUrl = `${url}${name}Visualizer/visualize?problemInstance=${parsedInstance}`;
  return await fetch(fullUrl).then(resp => resp.json());
}

export default AccordionTogglesSvg