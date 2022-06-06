import React, { useEffect,useState } from 'react'
import { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl,Row,Col } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarProblemType from './SearchBars/SearchBarProblemType';
import { ProblemContext } from '../contexts/ProblemProvider'
import {Stack,Button} from '@mui/material'

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


function AccordionNestedTextBox(props) {
  //console.log(props)
  const {problemName, problemInstance, setProblemName, setProblemInstance, makeApiCall } = useContext(ProblemContext)
  const handleChangeInstance = (event) => {
   // console.log(event.target.value);
    setProblemInstance(event.target.value)
  }
 

  const [testName,setTestName]= useState('DEFAULT ACCORDION NAME') //This may only actually cause a re-render event. But removing it means no rerender.
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP);

  useEffect(() => {
   // console.log("rerender problem Row accordion, TESTNAME")
    //console.log(testName,problemName)
    //console.log(props.accordion.TOOLTIP.header); //always is the previous state.
    requestProblemData(props.accordion.INPUTURL.url,problemName).then(data => {
      setToolTip({header:problemName,formalDef:data.formalDefinition,info:data.problemDefinition}) //updates TOOLTIP
    }).catch((error)=>console.log("TOOLTIP SET ERROR API CALL",error))
  }, [problemName])
  
  
  return (
    <div>

<Accordion className = "accordion" defaultActiveKey="1">
      <Card>
          <Card.Header>
           
            <Stack direction="horizontal" justifyContent="right" gap={2}>
            {props.accordion.CARD.cardHeaderText}

                {/* <FormControl placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}>
                </FormControl> *FORM CONTROL 1 (header) */}
                <SearchBarProblemType setTestName = {setTestName} placeholder = {props.accordion.ACCORDION_FORM_ONE.placeHolder} url = {props.accordion.INPUTURL.url}></SearchBarProblemType>
             
              <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>  
              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>

              </Stack>
            
        </Card.Header>

        <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Stack direction="horizontal" gap={1}>
              {props.accordion.CARD.cardBodyText}
                <FormControl as= "textarea" value={problemInstance} onChange={handleChangeInstance} ></FormControl> {/**FORM CONTROL 2 (dropdown) */}
            </Stack>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    
          </Accordion>
          
    </div>
      );
}



async function requestProblemData(url, name) {
  console.log(name)
  return await fetch(url+name+"Generic").then(resp => resp.json());
}



export default AccordionNestedTextBox