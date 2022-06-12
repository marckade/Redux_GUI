/**
 * AccordionNestedTextBox.js
 * 
 * This component does the real grunt work of the ProblemRow component. It uses passed in props to style and provide default text for its objects,
 * uses and updates the global state for the problem and problem instance, and has a variety of listeners and API calls.
 * 
 * Essentialy, this is the brains of the ProblemRowReact.js component and deals with the GUI's Problem "Row"
 * @author Alex Diviney
 */

import React, { useEffect, useState } from 'react'
import { useContext,useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl,Row,Col } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarProblemType from './SearchBars/SearchBarProblemType';
import { ProblemContext } from '../contexts/ProblemProvider'
import {Stack,Button} from '@mui/material'

/**
 * This represents the button that triggers the accordion component opening or closing
 * 
 * @param {*} param0 parameters change handler
 * @returns A Dropdown toggle component. 
 */
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
/**
 *  Creates an accordion that has a nested autocomplete search bar, as well as an editable problem instance textbox
 * 
 * @param {*} props passed down props from ProblemRowReact. Note that Technically, these props could be passed down from anywhere
 * @returns 
 */
function AccordionNestedTextBox(props) {
 
  //console.log(props)
  const { problemName, problemType, problemInstance, setProblemName, setProblemInstance, makeApiCall, setProblemJson } = useContext(ProblemContext)
  const [testName,setTestName]= useState('DEFAULT ACCORDION NAME') //This may only actually cause a re-render event. But removing it means no rerender.
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP);

  
  const [state, setState] = useState("DEFAULT")
  const [seconds, setSeconds] = useState(1);

  //Alex Note:
  //This is a lazy way to ensure that the state of the application updates when the problem instance field is edited.
  //We cannot change the global state on every character change of instance, because the way that React Context works, it notifies 
  //all state variable listeners (as far as I can tell) that a change has happened and essentially will rerender listener components. 
  //A rerender triggers a cascade of API calls, which so far as I can tell, are acting pretty synchronously. This slows user input to a crawl
  //and triggers a large amount of uneccessary api requests.  
  //Instead we have a timer here that will update the state continuously, grabbing whatever state the instance is at upon time of trigger and 
  //then updating all listeners with that state. This solution is NOT SCALABLE, and needs to be improved.
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
      setProblemInstance(state)
      console.log("TIMER")
      console.log(state)
    }, 5000);
               // clearing interval
    return () => clearInterval(timer);
  });

  //Updates the problem instance on problem name change to be the default instance of the new problem. also updates tooltips with that information.
  useEffect(() => {
    try {
      console.log(props.accordion.INPUTURL.url)
      requestProblemData(props.accordion.INPUTURL.url, problemName, problemType).then(data => {
        if (!(typeof data === "undefined")) {
          console.log(data);
          console.log(data.defaultInstance)
          setState(data.defaultInstance)
          setToolTip({ header: problemName, formalDef: data.formalDefinition, info: data.problemDefinition + data.source })
        }
          
      }).catch(console.log("Problem not defined"));
    }
    catch {
      console.log("problem name is empty")
    }
  },[problemName])
  
  //Local state that handles problem instance change without triggering mass refreshing.
  const handleChangeInstance = (event) => {
    console.log(event.target.value);
    setState(event.target.value)
    console.log(state)
  }
 
  
  return (
    <div>
<Accordion className = "accordion" defaultActiveKey="1">
      <Card>
          <Card.Header>
           
            <Stack direction="horizontal" justifyContent="right" gap={2}>
            {props.accordion.CARD.cardHeaderText}
              {/**FORM CONTROL 1 */ }
              <SearchBarProblemType setTestName={setTestName} placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder} url={props.accordion.INPUTURL.url}></SearchBarProblemType>
             
              <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>  
              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>

              </Stack>
            
        </Card.Header>

        <Accordion.Collapse eventKey="0">
            <Card.Body>
            <Stack direction="horizontal" gap={1}>
              {props.accordion.CARD.cardBodyText}
                <FormControl as= "textarea" value={state} onChange={handleChangeInstance} ></FormControl> {/**FORM CONTROL 2 (dropdown) */}
            </Stack>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    
          </Accordion>
          
    </div>
      );
}


/**
 * 
 * @param {*} url the base url of the application 
 * @param {*} name The name of the selected problem
 * @returns A promise from the passed in url. 
 */
async function requestProblemData(url, name) {
    console.log(name)
  return await fetch(url + name + "Generic").then(resp =>
  {
    if (resp.ok) {
      return resp.json()
    }
  });
  
}



export default AccordionNestedTextBox