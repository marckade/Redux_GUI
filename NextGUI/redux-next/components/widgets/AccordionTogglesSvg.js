import React from 'react'
import { useContext,useState } from 'react';
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
  let isSwitch1Checked;
  let isSwitch2Checked = false;
  let isSwitch3Checked = false;

  
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
  
  const [dotInstance, setDotInstance] = useState(graphDotTest2);
  const [toggle1, setToggle1] = useState(false);
  const {problemName,problemInstance } = useContext(ProblemContext);
  function handleSwitch1Change(e) {
    setToggle1(!toggle1)
    if (toggle1) {
      //setDotInstance(graphDotTest2);
      requestDotInstance(props.accordion.INPUTURL.url, problemName, problemInstance).then(data => {
        console.log(data);
        return data;
      })
        .then(data => {
          var parsedInstance = data.replaceAll('"', '');
          parsedInstance = parsedInstance.replaceAll('\\u003E', '>');
        setDotInstance(parsedInstance)
        }).catch((error) => console.log(error));
    }
    else {
      setDotInstance(graphDotTest);
    }
    console.log(toggle1)
    isSwitch1Checked = e.target.checked;
    if (isSwitch1Checked) {
      visualization = <Graphvisualization DOT={dotInstance} />;
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

      // visualization = <div>
      //   <Graphvisualization />
      //   <Graphvisualization />

      // </div>;
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


              
              <Stack className ="justify-content-center" direction="horizontal" gap={2}>
              <Graphvisualization DOT={dotInstance} />
              <Graphvisualization DOT={dotInstance} />

                {/* {isSwitch1Checked ? <Graphvisualization/> : null} */}


      
                {/* <div id="instanceDiv" >
                <Graphvisualization id='Test' visualization="Daniel"></Graphvisualization>

                </div>    
                <div id="reduceInstanceDiv">
                <Graphvisualization id='' ></Graphvisualization>
                </div> */}

             
              </Stack>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>
    </div>
  );
}

async function requestDotInstance(url, name, instance) {
  var parsedInstance = instance.replaceAll('&', '%26');


  const fullUrl = url + name + `Visualizer/visualize?problemInstance=${parsedInstance}`;
  return await fetch(fullUrl).then(resp =>resp.json());
}

export default AccordionTogglesSvg