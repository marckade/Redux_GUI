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
  const [disableButton, setActive] = useState(false) // keeps track of button

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

    if(!chosenReduceTo){
      setActive(true);
    }else{
      setActive(false);
    }

  
    setReducedInstance('');;
  }, [chosenReduceTo])


  //TOOLTIP RIGHT
  useEffect(() => {
    let reductionType = chosenReductionType.split("-")[0];
    requestReductionData(props.accordion.INPUTURL.url, reductionType).then(data => {
      console.log("REDUCTION TYPE: ", reductionType)
      setToolTip2({ header: reductionType, formalDef: data.reductionDefinition, info: data.source }) //updates TOOLTIP
  
     
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
                  disabled= {disableButton}
                >{props.accordion.BUTTON.buttonText}</Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>

    </div>
  );


}

// Returns a "pretty" version of the reduction string if possible.
function createPrettyFormat(rawInstance){
  if (rawInstance === undefined){
    return null;
  }

  const prettyInstace = checkProblemType(rawInstance);

  // Checks if this is actually a node / edge format. If not, show the original form.
  if (prettyInstace === null){
    return (
      <>{rawInstance}</>
    );
  }
  if (prettyInstace[0] === "GRAPH"){
    return (
      <>
        <p><b>Nodes:</b></p>
        <p>{prettyInstace[1]}</p>
        <p><b>Edges:</b></p>
        <p>{prettyInstace[2]}</p> 
        <p><b>Original form:</b></p>
        <p>{rawInstance}</p>
      </>
    );}
    

    if(prettyInstace[0] === "BOOLEAN"){
      return (
        <>
          <p><b>Literals:</b></p>
          <p>{prettyInstace[1]}</p>
          <p><b>Clauses:</b></p>
          <p>{prettyInstace[2]}</p>  
          <p><b>Original form:</b></p>
          <p>{rawInstance}</p>
        </>
      );}  

      else{
        return (
          <>{rawInstance}</>
        );}
}

/*Takes a raw instance and tried to parse it diffrent ways with regex. 
If any of them match it return both a "pretty" version of the instance in a array [0] defines the type(Boolean, graph etc.).
In the case of a graph nodes and edges are returned in [1] and [2] respectively.
SAT or boolean form is only the "pretty" form in [1] and [2] is an empty string.*/
function checkProblemType(stringInstance){
  const spacedInstance = stringInstance.replace(/,/g, ', ');

  // Regex for undirected graph
  const prettyUndirectedNodes = spacedInstance.match('((?<={{)[ -~]+)(?=}, {{)');
  const prettyUndirectedEdges = spacedInstance.match('((?<=}, {)[ -~]+)(?=}, )');
  if (prettyUndirectedNodes != null){
    return ["GRAPH", prettyUndirectedNodes[0], prettyUndirectedEdges[0]];
  }

  // Regex for directed graph. Consequently the edge regex is the same for both directed and undirected. Shouldn't be a problem, but good to note.
  const prettyDirectedNodes = spacedInstance.match('((?<={{)[ -~]+)(?=}, {\\()');
  const prettyDirectedEdges = spacedInstance.match('((?<=}, {)[ -~]+)(?=}, )');
  if(prettyDirectedNodes != null){
    return ["GRAPH", prettyDirectedNodes[0], prettyDirectedEdges[0]];
  }

  // Regex for Boolean problems.Getting rid of all the characters we don't need and spliting to get all the literals.
  const literalArray = stringInstance.replaceAll("(", "")
                           .replaceAll(")", "|") // Replace with a | for splitting
                           .replaceAll("&", "")
                           .split("|");
  const uniqueLiterals = new Set (literalArray); // Getting rid of duplicate literals
  var literalString = ""
  uniqueLiterals.forEach((literal)=>{
    literalString += literal + ", "
  })
  literalString = literalString.match('(?:.)+(?=, , )'); // Getting rid of trailing commas.

  const clauses = stringInstance.replaceAll("|", " | ").replaceAll("&", ", ")

  // Literals and clauses.
  if(clauses != "" && literalString != ""){
    return ["BOOLEAN", literalString, clauses];
  }

  // Nothing matches return nothing.
  return null;
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