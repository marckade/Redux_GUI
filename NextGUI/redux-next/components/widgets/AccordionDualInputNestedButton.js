/**
 * AccordionDualInputNestedButton.js
 * 
 * This component does the real grunt work of the ReduceToRow component. It uses passed in props to style and provide default text for its objects,
 * uses the global state values for the problem name and instance, sets global state values pertaining to reduction, and has a variety of listeners and API calls.
 * 
 * Essentialy, this is the brains of the ReduceToRowReact.js component and deals with the GUI's Reduce "Row"
 * @author Alex Diviney
 */


import React from 'react'
import { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, AccordionContext, FormControl, Col, Row, Container } from 'react-bootstrap'
import { Stack, Button, Box } from '@mui/material'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PopoverTooltipClick from './PopoverTooltipClick';

import { ProblemContext } from '../contexts/ProblemProvider';
import SearchBarSelectReduceToV2 from './SearchBars/SearchBarSelectReduceToV2';
import SearchBarSelectReductionTypeV2 from './SearchBars/SearchBarSelectReductionTypeV2';


function ContextAwareToggle({ children, eventKey, callback, colors }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <Button
      sx={{ height: 54, width: 64 }}
      color='white'
      className="float-end"
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? colors.orange : colors.grey }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

function AccordionDualInputNestedButton(props) {
  console.log("STATE CHANGE REDUCEBOX")

  var REDUCETOOPTIONSURL = props.accordion.INPUTURL.url;
  var REDUCTIONTYPEOPTIONSURL = props.accordion.INPUTURL.url;
  const { problemName, problemInstance, problemType, chosenReduceTo, setChosenReduceTo, chosenReductionType, setChosenReductionType, reducedInstance, setReducedInstance } = useContext(ProblemContext)

  const [reducedInstanceLocal, setReducedInstanceLocal] = useState();


      //new
  REDUCETOOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/NPC_NavGraph/availableReductions/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  REDUCTIONTYPEOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/NPC_NavGraph/reductionPath/' + '?reducingFrom=' + problemName + '&reducingTo=' + chosenReduceTo + '&problemType=' + problemType
      
  // REDUCETOOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_ReductionsRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  // REDUCTIONTYPEOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/PossibleReductionsRefactor/' + '?reducingFrom=' + problemName + '&reducingTo=' + chosenReduceTo + '&problemType=' + problemType
  //console.log(reducedInstance)
  //console.log(problemName)
  const [toolTip, setToolTip] = useState(props.accordion.TOOLTIP1); //Keeps track of tooltip state (left)
  const [toolTip2, setToolTip2] = useState(props.accordion.TOOLTIP2) //keeps track of tooltip state (right)
  const [testData, setTestData] = useState("TEST DATA REDUCE") //keeps track of reduce to text

  const reduceRequest = async () => {
    console.log("Problem Instance at time of reduce req: \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+ problemInstance);

    if(chosenReductionType !== '' && chosenReductionType !== null){
      let reductionPath = chosenReductionType.split("-")
      let i = 0
      let data = problemInstance
      for(i; i<reductionPath.length-1; i++){
        await requestReducedInstance(props.accordion.INPUTURL.url, reductionPath[i], data).then(d=>{
          data = d.reductionTo.instance
        })
      }
      await requestReducedInstance(props.accordion.INPUTURL.url, reductionPath[i], data).then(data => {

        setReducedInstance(data.reductionTo.instance);
        setReducedInstanceLocal(data.reductionTo.instance);
        setReducedInstanceLocal(problemInstance);
        
        //var reducedInstance = data.reductionTo.instance;
        // Gets the list of nodes in the raw expression
        //const prettyFormat = createPrettyFormat(reducedInstance);
        //console.log("\n\n\n\n\n\n\n"+prettyFormat);

      }).catch((error) => console.log("REDUCTION FAILED, one or more properties was invalid"))
    }

  }




  //TOOLTIP LEFT
  useEffect(() => {
    REDUCETOOPTIONSURL = props.accordion.INPUTURL.url + 'Navigation/Problem_ReductionsRefactor/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
    requestProblemData(props.accordion.INPUTURL.url, chosenReduceTo).then(data => {
      setToolTip({ header: chosenReduceTo, formalDef: data.formalDefinition, info: data.problemDefinition }) //updates TOOLTIP
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))

  
    setReducedInstance('');;
  }, [chosenReduceTo])


  //TOOLTIP RIGHT
  useEffect(() => {
    requestReductionData(props.accordion.INPUTURL.url, chosenReductionType).then(data => {
      console.log("REDUCTION TYPE: ", chosenReductionType)
      setToolTip2({ header: chosenReductionType, formalDef: data.reductionDefinition, info: data.source }) //updates TOOLTIP
  
     
    }).catch((error) => console.log("TOOLTIP SET ERROR API CALL", error))

   
    setReducedInstance('');;
  }, [chosenReductionType])



  return (
    
    <div>

      

      <Accordion className="accordion" defaultActiveKey="0">
        <Card>
          <Card.Header>

            <Stack direction="horizontal" justifyContent="right" gap={2}>
              <Box
                sx={{ width: '22%' }}
              >
                {props.accordion.CARD.cardHeaderText}
              </Box>
              <SearchBarSelectReduceToV2
                placeholder={props.accordion.ACCORDION_FORM_ONE.placeHolder}
                url={REDUCETOOPTIONSURL}
                setData={setChosenReduceTo}
                setInstance={setReducedInstance}
                data={testData}
              /> {/**Search bar left (form control 1) */}

              <PopoverTooltipClick toolTip={toolTip}></PopoverTooltipClick>

              <SearchBarSelectReductionTypeV2
                placeholder={props.accordion.ACCORDION_FORM_TWO.placeHolder}
                url={REDUCTIONTYPEOPTIONSURL}
                setData={setChosenReductionType}
                data={chosenReduceTo}
                instanceURL={props.accordion.INPUTURL.url}
                // setInstance={setReducedInstance}


              />
              <PopoverTooltipClick toolTip={toolTip2}></PopoverTooltipClick>
              <ContextAwareToggle eventKey="0" colors={props.accordion.THEME.colors}>▼</ContextAwareToggle>

            </Stack>

          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>

            <Card.Text>{createPrettyFormat(reducedInstance)}</Card.Text>
            
              <div className="submitButton">
                <Button
                  size='large'
                  color='white'
                  style={{ backgroundColor: props.accordion.THEME.colors.grey }}
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

function createPrettyFormat(rawInstance){
  if (rawInstance === undefined){
    return null;
  }
  //const prettyNodesRegex = rawInstance.match('((?<={{)[ -~]+)(?=},{{)'); //((?<={{)[ -~]+)(?=},{{)  ((?<={)[ -~]+)(?=,{{)
  const spacedInstance = rawInstance.replace(/,/g, ', ');
  const prettyNodesRegex = spacedInstance.match('((?<={{)[ -~]+)(?=}, {{)');
  // var prettyNode = prettyNodesRegex[0];

  // Checks if this is actually a node / edge format. If not, show the original form.
  if (prettyNodesRegex === null){
    return (
      <>{rawInstance}</>
    );
  }

  // Gets the list of all the edges in the raw expression
  const prettyEdgesRegex = spacedInstance.match('((?<=}, {)[ -~]+)(?=}, )'); // ((?<=}, {)[ -~]+)(?=}, )

  // prettyNodesRegex returns an array with 2 elements that are the same, so we just choose the first one [0].
  return (
    <>
      <p><b>Nodes:</b></p>
      <p>{prettyNodesRegex[0]}</p>
      <p><b>Edges:</b></p>
      <p>{prettyEdgesRegex[0]}</p> 
      <p><b>Original form:</b></p>
      <p>{rawInstance}</p>
    </>
  );
}

async function requestProblemData(url, name) {
  //console.log(name)
  //$`{url}{name}Generic`
  return await fetch(url + name + "Generic").then(resp => resp.json());
}

async function requestReductionData(url, reductionName) {
  //$`{url}{reductionName}/info`
  return await fetch(url + reductionName + '/info').then(resp => resp.json());
}



export async function requestReducedInstance(url, reductionName, reduceFrom) {
  var parsedInstance = reduceFrom.replaceAll('&', '%26');

  return await fetch(url + reductionName + '/reduce?' + "problemInstance=" + parsedInstance).then(resp => {
    if (resp.ok) {

      return resp.json();
    }
  })
}



export default AccordionDualInputNestedButton