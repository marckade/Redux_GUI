import React from 'react'
import { useContext,useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl, Col, Row, Container } from 'react-bootstrap'
import {Stack,Button} from '@mui/material'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipHover from './PopoverTooltipHover';
import SearchBarV2 from './SearchBars/SearchBarV2';
import SearchBarSelectReduction from './SearchBars/SearchBarSelectReduction';
import { ProblemContext } from '../contexts/ProblemProvider';


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

  const {problemName, problemType, chosenReduceTo, setChosenReduceTo,chosenReductionType,setChosenReductionType} = useContext(ProblemContext)
  var REDUCETOOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_ReductionsRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  var REDUCTIONTYPEOPTIONSURL = props.accordion.INPUTURL.url+ 'Navigation/PossibleReductionsRefactor/'+'?reducingFrom='+problemName+'&reducingTo='+chosenReduceTo+'&problemType='+problemType

  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP); //Keeps track of tooltip state (left)
  const [toolTip2,setToolTip2] = useState(props.accordion.TOOLTIP) //keeps track of tooltip state (right)
  const reduceRequest = () =>{console.log("Reduce Request")}

  //TOOLTIP LEFT
  useEffect(() => {
    REDUCETOOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_ReductionsRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
    requestProblemData(props.accordion.INPUTURL.url, chosenReduceTo).then(data => {
      setToolTip({header:chosenReduceTo,formalDef:data.formalDefinition,info:data.problemDefinition}) //updates TOOLTIP
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))
    
  }, [chosenReduceTo])


  //TOOLTIP RIGHT
  useEffect(() => {
    requestReductionData(props.accordion.INPUTURL.url, chosenReductionType).then(data => {
      console.log("REDUCTION TYPE: ",chosenReductionType)
      setToolTip2({header:chosenReductionType,formalDef:data.reductionDefinition,info:data.source}) //updates TOOLTIP
    }).catch((error)=>console.log("TOOLTIP SET ERROR API CALL",error))
  }, [chosenReductionType])

  return (
    <div>

      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>

            <Stack direction="horizontal" justifyContent="right" gap={2}>
              {props.accordion.CARD.cardHeaderText}
              <SearchBarV2
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={REDUCETOOPTIONSURL}
                setData={setChosenReduceTo}
                data={problemName}
              /> {/**Search bar left (form control 1) */}

            <PopoverTooltipHover toolTip={toolTip}></PopoverTooltipHover>  

              <SearchBarV2
                placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder}
                url={REDUCTIONTYPEOPTIONSURL}
                setData={setChosenReductionType}
                data={chosenReduceTo}
                

              />
              <PopoverTooltipHover toolTip={toolTip2}></PopoverTooltipHover>
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
  //$`{url}{name}Generic`
  return await fetch(url+name+"Generic").then(resp => resp.json());
}

async function requestReductionData(url,reductionName) {
    //$`{url}{reductionName}/info`
  return await fetch(url + reductionName + '/info').then(resp => resp.json());
}

export default AccordionDualInputNestedButton