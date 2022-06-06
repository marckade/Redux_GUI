import React from 'react'
import { useContext,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import { Stack, Button } from '@mui/material'
import { ProblemContext } from '../contexts/ProblemProvider';
import SearchBarSelectVerifierV2 from './SearchBars/SearchBarSelectVerifierV2';


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

function AccordionVerifier(props) {
  const { problemName, problemType, chosenVerifier,setChosenVerifier} = useContext(ProblemContext)
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP); //Keeps track of tooltip state (left)
  const [testData, setTestData] = useState();
  console.log("STATE CHANGE SOLVER")
  var SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_VerifiersRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  useEffect(() => {
    SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_VerifiersRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
    requestVerifyData(props.accordion.INPUTURL.url, chosenVerifier).then(data => {
      setToolTip({header:data.verifierName,formalDef:data.verifierDefinition,info:data.source}) //updates TOOLTIP
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))
  }, [chosenVerifier])

  
  
  return (
    <div>
      <Accordion className="accordion" defaultActiveKey="1">

        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={1}>
              <div>
                {props.accordion.CARD.cardHeaderText}
              </div>
              <SearchBarSelectVerifierV2
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={SOLVEROPTIONSURL}
                setData={setChosenVerifier}
                data={problemName}
              /> {/**Search bar left (form control 1) */}

              <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>

              <ContextAwareToggle eventKey="0">▼</ContextAwareToggle>
            </Stack>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              {props.accordion.CARD.cardBodyText}
              <div className="submitButton">
                <Button
                  style={{ backgroundColor: 'lightblue' }}
                >{props.accordion.BUTTON.buttonText}</Button>
              </div>
            </Card.Body>
            
          </Accordion.Collapse>

        </Card>

      </Accordion>

    </div>
  );
}


async function requestVerifyData(url,vName) {
  return await fetch(url + vName + '/info').then(resp => resp.json());
}

export default AccordionVerifier