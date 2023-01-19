/**
 * SearchBarSelectReduceToV2.js
 * 
* Attempts to create a generic searchbar with passed down props have failed, something about the array
 * of queried data is global and was causing label overriding. 
 * 
 * This searchbar is essentially the same as every other v2 suffix'd searchbar except for some error codes
 * @author Alex Diviney, Daniel Igbokwe
 */

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../../contexts/ProblemProvider';
import React,{useContext,useEffect, useState} from 'react';
import { ProblemParser } from '../../../Tools/ProblemParser';

const filter = createFilterOptions();
export const noReductionsMessage =
  'No reductions available. Click on the add button to add a new reduce-to';
//our problems to be shown
var problemJson = [];
const problemParser = new ProblemParser()



export default function SearchBarSelectReduceToV2(props) {
  //props.setData and props.data should be passed down.

  // const [defaultProblemName, setDefaultProblemName] = useState('');
  const [reductionProblem, setReduceTo] = useState(noReductionsMessage);
  const { problemType, problemName, setReducedInstance, reductionNameMap, setReductionNameMap,problemNameMap } = useContext(ProblemContext);
  const [noReductions, setNoReductions] = useState(true);
  

  // let stateVal = undefined;
  const fullUrl = props.url + 'Navigation/NPC_NavGraph/availableReductions/' + '?chosenProblem=' + problemName + '&problemType=' + problemType
  console.log(`URL is ${fullUrl}`)
   // initializeList(fullUrl);

    useEffect(() => {
      setReduceTo("");
      props.setData("");
      initializeList(fullUrl);
      if(problemName !== '' || problemName !== null){
        setNoReductions(true);
        setReduceTo(noReductionsMessage);
      }
    }, [problemName])

    useEffect(() => {
      requestReductionNameMap(props.url, problemName, reductionProblem).then(reductionMap => {
        setReductionNameMap(reductionMap);
      });

    }, [reductionProblem])
  
  
  
  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
    style={{ width: "100%" }}
    disabled={noReductions ? true : false}
    //problemParser.getWikiName(reductionProblem)
      value={reductionProblem}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // setChosenReduceTo(
          //   newValue
          // );
          props.setData(newValue);
          setReduceTo(newValue);
          // stateVal = newValue
        } else {
          //setChosenReduceTo(newValue);
          setReduceTo(newValue);
          props.setData(newValue);
          // stateVal = newValue;
        }

        if(newValue === "" || newValue === null ){
          props.setData("");
          setReducedInstance("");
          setReduceTo("");

        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
      

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="search-bar"
      options={problemJson}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return problemNameMap.get(option) ?? problemParser.getWikiName(option) ?? option;
          }
         
          // Regular option
          return ''
          // wikiName.get(option);
  
        }}    // return wiki_name here

      //renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={props.placeholder}
        InputProps={ noReductions ? { ...params.InputProps, style: { fontSize: 12 } } : {...params.InputProps}}
        />
        
      )}
    />
  );


  function initializeProblemJson(arr) { //converts asynchronous fetch request into synchronous call that sets the dropdown labels
    while (problemJson.length) { 
      problemJson.pop(); 
    }
    if (!arr.length) { 
      setNoReductions(true);
      setReduceTo(noReductionsMessage);
      props.setData('');
    }else{
      setNoReductions(false);
      setReduceTo('');
    }

    // problemJson = [];
    arr.map(function (element, index, array) {
      setNoReductions(false);
      if (!problemJson.includes(element)) {
        if(element ===  'CLIQUE'&& problemName === 'SAT3'){
          // stateVal = element;
          props.setData(element);
          setReduceTo(element);
        }
        else if(problemName === 'CLIQUE' && element === 'VERTEXCOVER'){
          
          props.setData(element);
          setReduceTo(element);
        }
        problemJson.push(element)
      }

    

    }, 80);
}

async function getRequest(url) {
    const promise = await fetch(url).then(result => {
      return result.json()
  })
  return promise;
  
}

function initializeList(url) {
  const req = getRequest(url);
  req.then(data => {
    initializeProblemJson(data)
    
  })
    .catch((error) => console.log("GET REQUEST FAILED SELECT REDUCE TO"));
    
}

// The following the functions are used to set the reduction names
async function requestReductionNameMap(url, problemFrom, problemTo){
  let map = new Map();
  await getAvailableReductions(url, problemFrom, problemTo).then(data => {
    data.forEach((r) => {
      r.forEach(reduction => {
        getInfo(url,reduction).then(info => {
          map.set(reduction, info.reductionName);
        }).catch(error => console.log("SOLVER INFO REQUEST FAILED"))
      });
    })
  }).catch(error => console.log("SOLUTIONS REQUEST FAILED"));
  return map;
}
async function getAvailableReductions(url, problemFrom, problemTo){
  return await fetch(url + `Navigation/NPC_NavGraph/reductionPath/?reducingFrom=${problemFrom}&reducingTo=${problemTo}&problemType=NPC`).then(resp => {
    if(resp.ok){
      return resp.json();
    }
  })
}
async function getInfo(url, reduction){
  return await fetch(url + `${reduction}/info`).then(resp => {
    if(resp.ok){
      return resp.json();
    }
  })
}
}


