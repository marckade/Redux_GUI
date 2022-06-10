import React from 'react'
import { useContext,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import { Stack, Button } from '@mui/material'
import { ProblemContext } from '../contexts/ProblemProvider';
import SearchBarSelectSolverV2 from './SearchBars/SearchBarSelectSolverV2';


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

function AccordionSingleInputNestedButton(props) {
  const { problemName, problemInstance,problemType, chosenSolver,setChosenSolver,solvedInstance,setSolvedInstance} = useContext(ProblemContext)
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP); //Keeps track of tooltip state (left)
  console.log("STATE CHANGE SOLVER")
  var SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_SolversRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  useEffect(() => {
    SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_SolversRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
    requestSolverData(props.accordion.INPUTURL.url, chosenSolver).then(data => {
      setToolTip({header:chosenSolver,formalDef:data.solverDefinition,info:data.source}) //updates TOOLTIP
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))
  }, [chosenSolver])

  const handleSolve = () => {
    console.log("SOLVE REQUEST BUTTON")
    requestSolvedInstance(props.accordion.INPUTURL.url, chosenSolver, problemInstance).then(data => {
      console.log(data)
      setSolvedInstance(data);
    }).catch((error) => {
      console.log("SOLVE REQUEST INSTANCE FAILED")
    })
  }
  
  return (
    <div>
      <Accordion className="accordion" defaultActiveKey="1">

        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={1}>
              <div>
                {props.accordion.CARD.cardHeaderText}
              </div>
              <SearchBarSelectSolverV2
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={SOLVEROPTIONSURL}
                setData={setChosenSolver}
                data={problemName}
              /> {/**Search bar left (form control 1) */}

              <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>

              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>
            </Stack>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              {props.accordion.CARD.cardBodyText +" "+ solvedInstance}
              <div className="submitButton">
                <Button
                  style={{ backgroundColor: 'lightblue' }}
                  onClick={handleSolve}
                >{props.accordion.BUTTON.buttonText}</Button>
              </div>
            </Card.Body>
            
          </Accordion.Collapse>

        </Card>

      </Accordion>

    </div>
  );
}


async function requestSolverData(url, solverName) {
  
  return await fetch(url + solverName + '/info').then(resp =>
    {
      if (resp.ok) {
        return resp.json();
      }
      });
}

async function requestSolvedInstance(url, sName, instance) {
  var parsedInstance = instance.replaceAll('&','%26');

  const totalUrl = url +`${sName}/solve?problemInstance=${parsedInstance}`
  return await fetch(totalUrl).then(resp =>
    {
      if (resp.ok) {
        return resp.json();
      }
      })
}

export default AccordionSingleInputNestedButton