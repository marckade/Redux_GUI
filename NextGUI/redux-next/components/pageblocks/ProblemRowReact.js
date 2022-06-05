import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../widgets/AccordionNestedTextBox'
import ProblemProvider, { ProblemContext } from '../contexts/ProblemProvider';
import { Component,useEffect } from 'react';


const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
const ACCORDION_FORM_ONE = { placeHolder: "Select problem" }
const ACCORDION_FORM_TWO = { placeHolder: "default instance" }
var CARD = { cardBodyText: "Instance", cardHeaderText: "Problem",problemInstance:"Default problem" }
const TOOLTIP = { header: "HELLO I AM PROBLEM INFORMATION", formalDef: "DefaultDef", info: "info" }
const INPUTURL = { url: reduxBaseUrl }


const ACCORDION = { ACCORDION_FORM_ONE, ACCORDION_FORM_TWO, CARD, TOOLTIP, INPUTURL }


function ProblemRowReact() {
    const { problemName } = useContext(ProblemContext)
    console.log(problemName.problemName)
    useEffect(() => {
     toolTipReq(problemName.problemName)
    },[problemName])
    return (
        <>
        <AccordionNestedTextBox accordion={ACCORDION}></AccordionNestedTextBox>
        </>
    )
}

function toolTipReq(problemName) {
    if (!(problemName===undefined)) {
        fetch(reduxBaseUrl + problemName+"Generic").then(resp => resp.json()).then(data => {
            TOOLTIP.info = data.problemDefinition;
            TOOLTIP.formalDef = data.formalDefinition
            TOOLTIP.header = problemName
        }).catch((error)=>{console.log("Failed to retrieve info, you likely entered a nonexistent problem name")}) 
    }
   
}
    
    
export default ProblemRowReact