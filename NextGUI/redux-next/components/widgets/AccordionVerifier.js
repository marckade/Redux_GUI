/**
 * AccordionDualInputNestedButton.js
 * 
 * This component does the real grunt work of the VerifyRow component. It uses passed in props to style and provide default text for its objects,
 * uses the global state values for the problem name and instance, sets global state values pertaining to reduction, and has a variety of listeners and API calls.
 * 
 * Essentialy, this is the brains of the VerifyRowReact.js component and deals with the GUI's Reduce "Row"
 * @author Alex Diviney
 */

import React from 'react'
import { useContext,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipClick from './PopoverTooltipClick';
import { Stack, Button,Box } from '@mui/material'
import { ProblemContext } from '../contexts/ProblemProvider';
import SearchBarSelectVerifierV2 from './SearchBars/SearchBarSelectVerifierV2';


// import FormControl from '../components/FormControl'


function ContextAwareToggle({ children, eventKey, callback,colors }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <Button
      color = 'white'
      className = "float-end"
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? colors.orange : colors.grey }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

function AccordionVerifier(props) {
  const [verifiedInstance, setVerifiedInstance] = useState("");
  const [verifyResult, setVerifyResult] = useState("");

  const { problemName, problemInstance, problemType, chosenVerifier,setChosenVerifier,solvedInstance} = useContext(ProblemContext)
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP); //Keeps track of tooltip state (left)
  console.log("STATE CHANGE VERIFIER")
  var SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_VerifiersRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType;

  useEffect(() => {
    SOLVEROPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_VerifiersRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
    requestVerifyData(props.accordion.INPUTURL.url, chosenVerifier).then(data => {
      setToolTip({header:data.verifierName,formalDef:data.verifierDefinition,info:data.source}) //updates TOOLTIP
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))
  }, [chosenVerifier])


  useEffect(() => { //This updated the cerificate text with a solution value when a user hits the solution button in SolvedRow
    setVerifiedInstance(solvedInstance)
  },[solvedInstance])


  const handleVerify = () => {
    requestVerifiedInstance(props.accordion.INPUTURL.url, chosenVerifier, problemInstance, verifiedInstance).then(data => {
      setVerifyResult(data);
    })
  }
  
    //Local state that handles problem instance change without triggering mass refreshing.
    const handleChangeCertificate = (event) => {
      console.log(event.target.value);
      setVerifiedInstance(event.target.value)
    }
  
  return (
    <div>
      <Accordion className="accordion" defaultActiveKey="1">

        <Card>
          <Card.Header>
            <Stack direction="horizontal" gap={2}>
              <Box sx={{ width: '10%' }}>
              {props.accordion.CARD.cardHeaderText}
              </Box>
             
              <SearchBarSelectVerifierV2
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={SOLVEROPTIONSURL}
                setData={setChosenVerifier}
                data={problemName}
              /> {/**Search bar left (form control 1) */}

              <PopoverTooltipClick toolTip={toolTip}></PopoverTooltipClick>

              <ContextAwareToggle eventKey="0" colors={props.accordion.THEME.colors}>▼</ContextAwareToggle>
            </Stack>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              {props.accordion.CARD.cardBodyText + " " }
              <FormControl as="textarea" value={verifiedInstance} onChange={handleChangeCertificate} ></FormControl> {/**FORM CONTROL 2 (dropdown) */}
              {"Verifier output: "+verifyResult + ""}
              <div className="submitButton">
                <Button
                  size='large'
                  color='white'
                  style={{ backgroundColor: props.accordion.THEME.colors.grey }}
                  onClick={handleVerify}
                >{props.accordion.BUTTON.buttonText}</Button>
              </div>
            </Card.Body>
            
          </Accordion.Collapse>

        </Card>

      </Accordion>

    </div>
  );
  
}


async function requestVerifyData(url, vName) {
  
  return await fetch(url + vName + '/info').then(resp =>
    {
      if (resp.ok) {
        return resp.json();
      }
      });
}
async function requestVerifiedInstance(url, vName, instance, cert) {
  var parsedInstance = instance.replaceAll('&','%26');

  const fetchUrl = url+vName+`/verify?problemInstance=${parsedInstance}&certificate=${cert}`
  return await fetch(fetchUrl).then(resp =>
    {
      if (resp.ok) {
        return resp.json();
      }
      });
}

export default AccordionVerifier