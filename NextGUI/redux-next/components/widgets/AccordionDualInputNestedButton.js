import React from 'react'
import { useContext,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl, Col, Row, Container } from 'react-bootstrap'
import {Stack,Button} from '@mui/material'

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarChooseReduceProblem from './SearchBars/SearchBarChooseReduceProblem';
import SearchBarSelectReduction from './SearchBars/SearchBarSelectReduction';
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

  const {problemName, chosenReduceTo } = useContext(ProblemContext)

  const [testName, setTestName] = useState('SAT3') //This may only actually cause a re-render event. But removing it means no rerender.
  const [testName2, setTestName2] = useState('SAT3') //This may only actually cause a re-render event. But removing it means no rerender.

  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP);
  const [toolTip2,setToolTip2] = useState(props.accordion.TOOLTIP)
  const reduceRequest = () =>{console.log("Reduce Request")}

  useEffect(() => {
    //console.log("rerender reduce Row accordion, TESTNAME")
   // console.log(testName,problemName)
   // console.log(props.accordion.TOOLTIP.header); //always is the previous state.
    requestProblemData(props.accordion.INPUTURL.url, testName).then(data => {
      //console.log("REDUCE TO NAME: ",testName)
      setToolTip({header:testName.problemName,formalDef:data.formalDefinition,info:data.problemDefinition}) //updates TOOLTIP
    }).catch((error)=>console.log("TOOLTIP SET ERROR API CALL",error))
  }, [chosenReduceTo])

  useEffect(() => {
    console.log("rerender reductionTypeRow accordion, TESTNAME")
   // console.log(testName,problemName)
   // console.log(props.accordion.TOOLTIP.header); //always is the previous state.
    requestReductionData(props.accordion.INPUTURL.url, testName2).then(data => {
      console.log("REDUCE TO NAME: ",testName2)
      setToolTip2({header:testName.problemName,formalDef:data.formalDefinition,info:data.problemDefinition}) //updates TOOLTIP
    }).catch((error)=>console.log("TOOLTIP SET ERROR API CALL",error))
  }, [chosenReduceTo])


  return (
    <div>

      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>



            <Stack direction="horizontal" justifyContent="right" gap={2}>
              {props.accordion.CARD.cardHeaderText}
              <SearchBarChooseReduceProblem
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={props.accordion.INPUTURL.url}
                setTestName={setTestName}
              /> {/**Search bar left (form control 1) */}

            <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>  

              <SearchBarSelectReduction
                placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder}
                setTestName={setTestName2}
                url={props.accordion.INPUTURL.url}

              />
              <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>
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

async function requestProblemData(url, name) {
  //console.log(name)
  return await fetch(url+name+"Generic").then(resp => resp.json());
}

async function requestReductionData(url,reductionName) {
  return await fetch(url + reductionName + '/info').then(resp => resp.json());
}

export default AccordionDualInputNestedButton